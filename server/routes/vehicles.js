const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Vehicle = require('../models/Vehicle');
const auth = require('../middleware/auth');
const partnerAuth = require('../middleware/partnerAuth');

const router = express.Router();

// @route   GET /api/vehicles
// @desc    Get all vehicles with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional().isIn(['excavator', 'truck', 'crane', 'bulldozer', 'loader', 'dump-truck', 'concrete-mixer', 'other']),
  query('minPriceHour').optional().isFloat({ min: 0 }),
  query('maxPriceHour').optional().isFloat({ min: 0 }),
  query('minPriceDay').optional().isFloat({ min: 0 }),
  query('maxPriceDay').optional().isFloat({ min: 0 }),
  query('city').optional().isLength({ min: 1 }),
  query('state').optional().isLength({ min: 1 }),
  query('search').optional().isLength({ min: 1 })
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
    const filter = { 
      'availability.isAvailable': true,
      status: 'active'
    };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.minPriceHour || req.query.maxPriceHour) {
      filter.pricePerHour = {};
      if (req.query.minPriceHour) filter.pricePerHour.$gte = parseFloat(req.query.minPriceHour);
      if (req.query.maxPriceHour) filter.pricePerHour.$lte = parseFloat(req.query.maxPriceHour);
    }

    if (req.query.minPriceDay || req.query.maxPriceDay) {
      filter.pricePerDay = {};
      if (req.query.minPriceDay) filter.pricePerDay.$gte = parseFloat(req.query.minPriceDay);
      if (req.query.maxPriceDay) filter.pricePerDay.$lte = parseFloat(req.query.maxPriceDay);
    }

    if (req.query.city) {
      filter['location.city'] = new RegExp(req.query.city, 'i');
    }

    if (req.query.state) {
      filter['location.state'] = new RegExp(req.query.state, 'i');
    }

    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    // Build sort object
    let sort = {};
    switch (req.query.sort) {
      case 'price_hour_asc':
        sort = { pricePerHour: 1 };
        break;
      case 'price_hour_desc':
        sort = { pricePerHour: -1 };
        break;
      case 'price_day_asc':
        sort = { pricePerDay: 1 };
        break;
      case 'price_day_desc':
        sort = { pricePerDay: -1 };
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

    const vehicles = await Vehicle.find(filter)
      .populate('owner', 'businessName rating contact')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Vehicle.countDocuments(filter);

    res.json({
      success: true,
      data: vehicles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching vehicles'
    });
  }
});

// @route   GET /api/vehicles/:id
// @desc    Get single vehicle by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('owner', 'businessName contact rating address')
      .populate('reviews');

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error('Get vehicle error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching vehicle'
    });
  }
});

// @route   POST /api/vehicles
// @desc    Create new vehicle (Partners only)
// @access  Private (Partner)
router.post('/', [auth, partnerAuth], [
  body('name').trim().isLength({ min: 2, max: 100 }),
  body('description').trim().isLength({ min: 10, max: 500 }),
  body('category').isIn(['excavator', 'truck', 'crane', 'bulldozer', 'loader', 'dump-truck', 'concrete-mixer', 'other']),
  body('type').trim().isLength({ min: 2 }),
  body('model').trim().isLength({ min: 2 }),
  body('year').isInt({ min: 1990, max: new Date().getFullYear() + 1 }),
  body('pricePerHour').isFloat({ min: 0 }),
  body('pricePerDay').isFloat({ min: 0 })
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

    const vehicleData = {
      ...req.body,
      owner: req.user.partnerId
    };

    const vehicle = await Vehicle.create(vehicleData);
    await vehicle.populate('owner', 'businessName rating');

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      data: vehicle
    });
  } catch (error) {
    console.error('Create vehicle error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating vehicle'
    });
  }
});

// @route   PUT /api/vehicles/:id
// @desc    Update vehicle (Owner only)
// @access  Private (Partner)
router.put('/:id', [auth, partnerAuth], async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if user owns this vehicle
    if (vehicle.owner.toString() !== req.user.partnerId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this vehicle'
      });
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('owner', 'businessName rating');

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      data: updatedVehicle
    });
  } catch (error) {
    console.error('Update vehicle error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating vehicle'
    });
  }
});

// @route   DELETE /api/vehicles/:id
// @desc    Delete vehicle (Owner only)
// @access  Private (Partner)
router.delete('/:id', [auth, partnerAuth], async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if user owns this vehicle
    if (vehicle.owner.toString() !== req.user.partnerId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this vehicle'
      });
    }

    await Vehicle.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error) {
    console.error('Delete vehicle error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting vehicle'
    });
  }
});

// @route   POST /api/vehicles/:id/availability
// @desc    Update vehicle availability
// @access  Private (Partner)
router.post('/:id/availability', [auth, partnerAuth], [
  body('isAvailable').isBoolean(),
  body('availableFrom').optional().isISO8601(),
  body('availableUntil').optional().isISO8601(),
  body('unavailableDates').optional().isArray()
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

    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if user owns this vehicle
    if (vehicle.owner.toString() !== req.user.partnerId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this vehicle'
      });
    }

    vehicle.availability = {
      ...vehicle.availability,
      ...req.body
    };

    await vehicle.save();

    res.json({
      success: true,
      message: 'Vehicle availability updated successfully',
      data: vehicle
    });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating availability'
    });
  }
});

// @route   GET /api/vehicles/categories/list
// @desc    Get all vehicle categories
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Vehicle.distinct('category');
    
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