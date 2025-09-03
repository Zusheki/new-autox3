const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Material = require('../models/Material');
const auth = require('../middleware/auth');
const partnerAuth = require('../middleware/partnerAuth');

const router = express.Router();

// @route   GET /api/materials
// @desc    Get all materials with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isIn(['sand', 'gravel', 'steel', 'concrete', 'bricks', 'timber', 'soil', 'stone', 'other']),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Minimum price must be non-negative'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Maximum price must be non-negative'),
  query('search').optional().isLength({ min: 1 }).withMessage('Search term cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { isAvailable: true };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.pricePerUnit = {};
      if (req.query.minPrice) filter.pricePerUnit.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.pricePerUnit.$lte = parseFloat(req.query.maxPrice);
    }

    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    // Build sort object
    let sort = {};
    switch (req.query.sort) {
      case 'price_asc':
        sort = { pricePerUnit: 1 };
        break;
      case 'price_desc':
        sort = { pricePerUnit: -1 };
        break;
      case 'rating':
        sort = { 'rating.average': -1 };
        break;
      case 'newest':
        sort = { createdAt: -1 };
        break;
      default:
        sort = { featured: -1, 'rating.average': -1 };
    }

    const materials = await Material.find(filter)
      .populate('supplier', 'businessName rating')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Material.countDocuments(filter);

    res.json({
      success: true,
      data: materials,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get materials error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching materials'
    });
  }
});

// @route   GET /api/materials/:id
// @desc    Get single material by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)
      .populate('supplier', 'businessName contact rating address')
      .populate('reviews');

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }

    res.json({
      success: true,
      data: material
    });
  } catch (error) {
    console.error('Get material error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching material'
    });
  }
});

// @route   POST /api/materials
// @desc    Create new material (Partners only)
// @access  Private (Partner)
router.post('/', [auth, partnerAuth], [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  body('category').isIn(['sand', 'gravel', 'steel', 'concrete', 'bricks', 'timber', 'soil', 'stone', 'other']),
  body('pricePerUnit').isFloat({ min: 0 }).withMessage('Price must be non-negative'),
  body('unit').isIn(['cubic meter', 'ton', 'kg', 'per 100 pieces', 'square meter', 'linear meter']),
  body('availableQuantity').isFloat({ min: 0 }).withMessage('Available quantity must be non-negative')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const materialData = {
      ...req.body,
      supplier: req.user.partnerId
    };

    const material = await Material.create(materialData);
    await material.populate('supplier', 'businessName rating');

    res.status(201).json({
      success: true,
      message: 'Material created successfully',
      data: material
    });
  } catch (error) {
    console.error('Create material error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating material'
    });
  }
});

// @route   PUT /api/materials/:id
// @desc    Update material (Owner only)
// @access  Private (Partner)
router.put('/:id', [auth, partnerAuth], [
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('description').optional().trim().isLength({ min: 10, max: 500 }),
  body('pricePerUnit').optional().isFloat({ min: 0 }),
  body('availableQuantity').optional().isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }

    // Check if user owns this material
    if (material.supplier.toString() !== req.user.partnerId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this material'
      });
    }

    const updatedMaterial = await Material.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('supplier', 'businessName rating');

    res.json({
      success: true,
      message: 'Material updated successfully',
      data: updatedMaterial
    });
  } catch (error) {
    console.error('Update material error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating material'
    });
  }
});

// @route   DELETE /api/materials/:id
// @desc    Delete material (Owner only)
// @access  Private (Partner)
router.delete('/:id', [auth, partnerAuth], async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }

    // Check if user owns this material
    if (material.supplier.toString() !== req.user.partnerId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this material'
      });
    }

    await Material.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Material deleted successfully'
    });
  } catch (error) {
    console.error('Delete material error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting material'
    });
  }
});

// @route   GET /api/materials/categories/list
// @desc    Get all material categories
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Material.distinct('category');
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
});

module.exports = router;