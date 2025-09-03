const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { Partner, User } = require('../models');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// @route   POST /api/partners/register
// @desc    Register as a partner
// @access  Private
router.post('/register', auth, [
  body('type').isIn(['vehicle_owner', 'material_supplier']).withMessage('Invalid partner type'),
  body('businessName').trim().isLength({ min: 2, max: 200 }).withMessage('Business name must be between 2 and 200 characters'),
  body('businessLicense').trim().notEmpty().withMessage('Business license is required'),
  body('taxId').trim().notEmpty().withMessage('Tax ID is required'),
  body('yearsInBusiness').isInt({ min: 0 }).withMessage('Years in business must be a non-negative integer'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('services').isArray({ min: 1 }).withMessage('At least one service must be selected'),
  body('address').isObject().withMessage('Address is required'),
  body('contact').isObject().withMessage('Contact information is required'),
  body('insurance').isObject().withMessage('Insurance information is required'),
  body('bankDetails').isObject().withMessage('Bank details are required')
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

    // Check if user already has a partner account
    const existingPartner = await Partner.findOne({ where: { userId: req.user.id } });
    if (existingPartner) {
      return res.status(400).json({
        success: false,
        message: 'User already has a partner account'
      });
    }

    const partnerData = {
      ...req.body,
      userId: req.user.id
    };

    const partner = await Partner.create(partnerData);

    res.status(201).json({
      success: true,
      message: 'Partner registration submitted successfully. We will review your application within 2-3 business days.',
      data: partner
    });
  } catch (error) {
    console.error('Partner registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during partner registration'
    });
  }
});

// @route   GET /api/partners/me
// @desc    Get current partner profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const partner = await Partner.findOne({
      where: { userId: req.user.id },
      include: [
        {
          association: 'user',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          association: 'materials',
          limit: 10
        },
        {
          association: 'vehicles',
          limit: 10
        }
      ]
    });

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner profile not found'
      });
    }

    res.json({
      success: true,
      data: partner
    });
  } catch (error) {
    console.error('Get partner profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching partner profile'
    });
  }
});

// @route   PUT /api/partners/me
// @desc    Update partner profile
// @access  Private
router.put('/me', auth, async (req, res) => {
  try {
    const partner = await Partner.findOne({ where: { userId: req.user.id } });

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner profile not found'
      });
    }

    const allowedUpdates = [
      'businessName', 'description', 'services', 'serviceAreas',
      'address', 'contact', 'certifications', 'preferences'
    ];
    
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    await partner.update(updates);

    res.json({
      success: true,
      message: 'Partner profile updated successfully',
      data: partner
    });
  } catch (error) {
    console.error('Update partner profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating partner profile'
    });
  }
});

// @route   GET /api/partners
// @desc    Get all partners (Admin only)
// @access  Private (Admin)
router.get('/', [auth, adminAuth], [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['pending', 'under_review', 'approved', 'rejected', 'suspended']),
  query('type').optional().isIn(['vehicle_owner', 'material_supplier'])
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

    const where = {};
    if (req.query.status) where.verificationStatus = req.query.status;
    if (req.query.type) where.type = req.query.type;

    const { count, rows: partners } = await Partner.findAndCountAll({
      where,
      include: [
        {
          association: 'user',
          attributes: ['id', 'name', 'email', 'phone']
        }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: partners,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get partners error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching partners'
    });
  }
});

// @route   PUT /api/partners/:id/verify
// @desc    Verify/reject partner application (Admin only)
// @access  Private (Admin)
router.put('/:id/verify', [auth, adminAuth], [
  body('status').isIn(['approved', 'rejected']).withMessage('Status must be approved or rejected'),
  body('notes').optional().trim()
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

    const { status, notes } = req.body;

    const partner = await Partner.findByPk(req.params.id);
    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found'
      });
    }

    await partner.update({
      verificationStatus: status,
      verificationNotes: notes,
      reviewedBy: req.user.id,
      reviewedAt: new Date()
    });

    res.json({
      success: true,
      message: `Partner ${status} successfully`,
      data: partner
    });
  } catch (error) {
    console.error('Verify partner error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while verifying partner'
    });
  }
});

module.exports = router;