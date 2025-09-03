const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const { User, ServiceRequest } = require('../models');
const { Op } = require('sequelize');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json({
      success: true,
      user: user
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  auth,
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('phone', 'Phone number is required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, address } = req.body;

  try {
    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      where: {
        email,
        id: { [Op.ne]: req.user.id }
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email is already registered to another account' 
      });
    }

    await req.user.update({ name, email, phone, address });
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      success: true,
      user: user
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/users/orders
// @desc    Get user's service requests/orders
// @access  Private
router.get('/orders', auth, async (req, res) => {
  try {
    const orders = await ServiceRequest.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Material,
          as: 'material'
        },
        {
          model: Vehicle,
          as: 'vehicle'
        }
      ],
      order: [['requestDate', 'DESC']]
    });

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/users/account
// @desc    Delete user account
// @access  Private
router.delete('/account', auth, async (req, res) => {
  try {
    // Remove user's service requests
    await ServiceRequest.destroy({ where: { userId: req.user.id } });

    // Remove user
    await User.destroy({ where: { id: req.user.id } });

    res.json({ 
      success: true,
      message: 'User account deleted successfully' 
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;