const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { Vehicle, Partner } = require('../models');
const auth = require('../middleware/auth');
const partnerAuth = require('../middleware/partnerAuth');
const { Op } = require('sequelize');

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
    const offset = (page - 1) * limit;

    // Build filter object
    const where = { 
      status: 'active'
    };

    if (req.query.category) {
      where.category = req.query.category;
    }

    if (req.query.minPriceHour) {
      where.pricePerHour = { ...where.pricePerHour, [Op.gte]: parseFloat(req.query.minPriceHour) };
    }
    
    if (req.query.maxPriceHour) {
      where.pricePerHour = { ...where.pricePerHour, [Op.lte]: parseFloat(req.query.maxPriceHour) };
    }

    if (req.query.minPriceDay) {
      where.pricePerDay = { ...where.pricePerDay, [Op.gte]: parseFloat(req.query.minPriceDay) };
    }
    
    if (req.query.maxPriceDay) {
      where.pricePerDay = { ...where.pricePerDay, [Op.lte]: parseFloat(req.query.maxPriceDay) };
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

    // Build order array
    let order = [];
    switch (req.query.sort) {
      case 'price_hour_asc':
        order = [['pricePerHour', 'ASC']];
        break;
      case 'price_hour_desc':
        order = [['pricePerHour', 'DESC']];
        break;
      case 'price_day_asc':
        order = [['pricePerDay', 'ASC']];
        break;
      case 'price_day_desc':
        order = [['pricePerDay', 'DESC']];
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

    const { count, rows: vehicles } = await Vehicle.findAndCountAll({
      where,
      include: [
        {
          model: Partner,
          as: 'owner',
          attributes: ['businessName', 'rating', 'contact']
        }
      ],
      order,
      offset,
      limit
    });

    res.json({
      success: true,
      data: vehicles,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
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
    const vehicle = await Vehicle.findByPk(req.params.id, {
      include: [
        {
          model: Partner,
          as: 'owner',
          attributes: ['businessName', 'contact', 'rating', 'address']
        }
      ]
    });

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
      ownerId: req.user.partnerId
    };

    const vehicle = await Vehicle.create(vehicleData);
    await vehicle.reload({
      include: [
        {
          model: Partner,
          as: 'owner',
          attributes: ['businessName', 'rating']
        }
      ]
    });

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
    const vehicle = await Vehicle.findByPk(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if user owns this vehicle
    if (vehicle.ownerId !== req.user.partnerId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this vehicle'
      });
    }

    await vehicle.update(req.body);
    await vehicle.reload({
      include: [
        {
          model: Partner,
          as: 'owner',
          attributes: ['businessName', 'rating']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle
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
    const vehicle = await Vehicle.findByPk(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if user owns this vehicle
    if (vehicle.ownerId !== req.user.partnerId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this vehicle'
      });
    }

    await vehicle.destroy();

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

    const vehicle = await Vehicle.findByPk(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if user owns this vehicle
    if (vehicle.ownerId !== req.user.partnerId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this vehicle'
      });
    }

    const availabilityData = {
      ...req.body
    };

    await vehicle.update({ availability: availabilityData });

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
    const vehicles = await Vehicle.findAll({
      attributes: ['category'],
      group: ['category']
    });
    
    const categories = vehicles.map(v => v.category);
    
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