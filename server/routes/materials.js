const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { Material, Partner } = require('../models');
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
    const offset = (page - 1) * limit;

    // Build filter object
    const where = { isAvailable: true };

    if (req.query.category) {
      where.category = req.query.category;
    }

    if (req.query.minPrice) {
      where.pricePerUnit = { ...where.pricePerUnit, [Op.gte]: parseFloat(req.query.minPrice) };
    }
    
    if (req.query.maxPrice) {
      where.pricePerUnit = { ...where.pricePerUnit, [Op.lte]: parseFloat(req.query.maxPrice) };
    }

    // Build order array
    let order = [];
    switch (req.query.sort) {
      case 'price_asc':
        order = [['pricePerUnit', 'ASC']];
        break;
      case 'price_desc':
        order = [['pricePerUnit', 'DESC']];
        break;
      case 'rating':
        order = [['rating', 'DESC']];
        break;
      case 'newest':
        order = [['createdAt', 'DESC']];
        break;
      default:
        order = [['featured', 'DESC'], ['rating', 'DESC']];
    }

    const { count, rows: materials } = await Material.findAndCountAll({
      where,
      include: [
        {
          model: Partner,
          as: 'supplier',
          attributes: ['businessName', 'rating']
        }
      ],
      order,
      offset,
      limit
    });

    res.json({
      success: true,
      data: materials,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
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
    const material = await Material.findByPk(req.params.id, {
      include: [
        {
          model: Partner,
          as: 'supplier',
          attributes: ['businessName', 'contact', 'rating', 'address']
        }
      ]
    });

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
      supplierId: req.user.partnerId
    };

    const material = await Material.create(materialData);
    await material.reload({
      include: [
        {
          model: Partner,
          as: 'supplier',
          attributes: ['businessName', 'rating']
        }
      ]
    });

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

    const material = await Material.findByPk(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }

    // Check if user owns this material
    if (material.supplierId !== req.user.partnerId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this material'
      });
    }

    await material.update(req.body);
    await material.reload({
      include: [
        {
          model: Partner,
          as: 'supplier',
          attributes: ['businessName', 'rating']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Material updated successfully',
      data: material
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
    const material = await Material.findByPk(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }

    // Check if user owns this material
    if (material.supplierId !== req.user.partnerId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this material'
      });
    }

    await material.destroy();

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
    const materials = await Material.findAll({
      attributes: ['category'],
      group: ['category']
    });
    
    const categories = materials.map(m => m.category);
    
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