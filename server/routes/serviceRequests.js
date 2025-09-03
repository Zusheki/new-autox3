const express = require('express');
const { body, query, validationResult } = require('express-validator');
const ServiceRequest = require('../models/ServiceRequest');
const Material = require('../models/Material');
const Vehicle = require('../models/Vehicle');
const auth = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// @route   POST /api/service-requests
// @desc    Create new service request
// @access  Private
router.post('/', auth, [
  body('type').isIn(['material', 'vehicle']).withMessage('Type must be either material or vehicle'),
  body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be non-negative'),
  body('requiredDate').isISO8601().withMessage('Required date must be a valid date'),
  body('address').trim().isLength({ min: 5 }).withMessage('Address must be at least 5 characters'),
  body('contactDetails.name').trim().isLength({ min: 2 }).withMessage('Contact name is required'),
  body('contactDetails.phone').isMobilePhone().withMessage('Valid phone number is required'),
  body('contactDetails.email').isEmail().withMessage('Valid email is required')
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

    const {
      type,
      material: materialId,
      vehicle: vehicleId,
      quantity,
      duration,
      durationType,
      totalPrice,
      requiredDate,
      address,
      contactDetails,
      notes,
      specialRequirements
    } = req.body;

    // Validate based on type
    if (type === 'material') {
      if (!materialId || !quantity) {
        return res.status(400).json({
          success: false,
          message: 'Material ID and quantity are required for material requests'
        });
      }

      // Check if material exists and is available
      const material = await Material.findById(materialId);
      if (!material || !material.isAvailable) {
        return res.status(400).json({
          success: false,
          message: 'Material not found or not available'
        });
      }

      // Check if requested quantity is available
      if (quantity > material.availableQuantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${material.availableQuantity} ${material.unit} available`
        });
      }
    } else if (type === 'vehicle') {
      if (!vehicleId || !duration || !durationType) {
        return res.status(400).json({
          success: false,
          message: 'Vehicle ID, duration, and duration type are required for vehicle requests'
        });
      }

      // Check if vehicle exists and is available
      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle || !vehicle.availability.isAvailable || vehicle.status !== 'active') {
        return res.status(400).json({
          success: false,
          message: 'Vehicle not found or not available'
        });
      }
    }

    // Create service request
    const serviceRequestData = {
      user: req.user.id,
      type,
      totalPrice,
      requiredDate,
      address,
      contactDetails,
      notes,
      specialRequirements
    };

    if (type === 'material') {
      serviceRequestData.material = materialId;
      serviceRequestData.quantity = quantity;
    } else {
      serviceRequestData.vehicle = vehicleId;
      serviceRequestData.duration = duration;
      serviceRequestData.durationType = durationType;
    }

    const serviceRequest = await ServiceRequest.create(serviceRequestData);
    
    // Populate the request with item details
    await serviceRequest.populate([
      { path: 'user', select: 'name email phone' },
      { path: 'material', select: 'name pricePerUnit unit supplier' },
      { path: 'vehicle', select: 'name pricePerHour pricePerDay owner' }
    ]);

    // Send confirmation email to user
    try {
      await sendEmail({
        to: req.user.email,
        subject: 'Service Request Confirmation - Auto X Sri Lanka',
        template: 'serviceRequestConfirmation',
        data: {
          orderNumber: serviceRequest.tracking.orderNumber,
          type: serviceRequest.type,
          itemName: serviceRequest.material?.name || serviceRequest.vehicle?.name,
          totalPrice: serviceRequest.totalPrice,
          requiredDate: serviceRequest.requiredDate
        }
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Service request created successfully',
      data: serviceRequest
    });
  } catch (error) {
    console.error('Create service request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating service request'
    });
  }
});

// @route   GET /api/service-requests
// @desc    Get user's service requests
// @access  Private
router.get('/', auth, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'rejected']),
  query('type').optional().isIn(['material', 'vehicle'])
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

    const filter = { user: req.user.id };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.type) {
      filter.type = req.query.type;
    }

    const serviceRequests = await ServiceRequest.find(filter)
      .populate('material', 'name pricePerUnit unit images')
      .populate('vehicle', 'name pricePerHour pricePerDay images')
      .populate('assignedTo', 'businessName contact rating')
      .sort({ requestDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ServiceRequest.countDocuments(filter);

    res.json({
      success: true,
      data: serviceRequests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get service requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching service requests'
    });
  }
});

// @route   GET /api/service-requests/:id
// @desc    Get single service request
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('material', 'name description pricePerUnit unit images supplier')
      .populate('vehicle', 'name description pricePerHour pricePerDay images owner')
      .populate('assignedTo', 'businessName contact rating address');

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    // Check if user owns this request or is the assigned partner
    if (serviceRequest.user._id.toString() !== req.user.id && 
        (!serviceRequest.assignedTo || serviceRequest.assignedTo._id.toString() !== req.user.partnerId)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this service request'
      });
    }

    res.json({
      success: true,
      data: serviceRequest
    });
  } catch (error) {
    console.error('Get service request error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching service request'
    });
  }
});

// @route   PUT /api/service-requests/:id/status
// @desc    Update service request status
// @access  Private
router.put('/:id/status', auth, [
  body('status').isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'rejected']),
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

    const serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    const { status, notes } = req.body;

    // Check authorization based on status change
    if (status === 'cancelled') {
      // Only user can cancel
      if (serviceRequest.user.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Only the requester can cancel this request'
        });
      }
    } else {
      // Only assigned partner can update other statuses
      if (!serviceRequest.assignedTo || serviceRequest.assignedTo.toString() !== req.user.partnerId) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this service request'
        });
      }
    }

    // Update status
    serviceRequest.status = status;
    if (notes) serviceRequest.notes = notes;

    if (status === 'completed') {
      serviceRequest.completedDate = new Date();
    }

    if (status === 'cancelled') {
      serviceRequest.cancellation = {
        reason: notes || 'Cancelled by user',
        cancelledBy: 'user',
        cancelledDate: new Date()
      };
    }

    await serviceRequest.save();

    // Send status update email
    try {
      await sendEmail({
        to: serviceRequest.user.email,
        subject: `Service Request ${status.toUpperCase()} - Auto X Sri Lanka`,
        template: 'statusUpdate',
        data: {
          orderNumber: serviceRequest.tracking.orderNumber,
          status: status,
          notes: notes
        }
      });
    } catch (emailError) {
      console.error('Failed to send status update email:', emailError);
    }

    res.json({
      success: true,
      message: 'Service request status updated successfully',
      data: serviceRequest
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating status'
    });
  }
});

// @route   POST /api/service-requests/:id/feedback
// @desc    Add feedback to completed service request
// @access  Private
router.post('/:id/feedback', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters')
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

    const serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    // Check if user owns this request
    if (serviceRequest.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add feedback to this request'
      });
    }

    // Check if request is completed
    if (serviceRequest.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only add feedback to completed requests'
      });
    }

    // Check if feedback already exists
    if (serviceRequest.feedback.rating) {
      return res.status(400).json({
        success: false,
        message: 'Feedback already provided for this request'
      });
    }

    const { rating, comment } = req.body;

    serviceRequest.feedback = {
      rating,
      comment,
      date: new Date()
    };

    await serviceRequest.save();

    res.json({
      success: true,
      message: 'Feedback added successfully',
      data: serviceRequest
    });
  } catch (error) {
    console.error('Add feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding feedback'
    });
  }
});

module.exports = router;