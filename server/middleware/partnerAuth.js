const Partner = require('../models/Partner');

const partnerAuth = async (req, res, next) => {
  try {
    // Check if user is authenticated (should be called after auth middleware)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Find partner associated with this user
    const partner = await Partner.findOne({ 
      user: req.user._id,
      'verification.status': 'approved',
      isActive: true
    });

    if (!partner) {
      return res.status(403).json({
        success: false,
        message: 'Partner access required. Please register as a partner or wait for approval.'
      });
    }

    // Add partner info to request
    req.user.partnerId = partner._id;
    req.user.partnerType = partner.type;
    req.partner = partner;

    next();
  } catch (error) {
    console.error('Partner auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in partner authentication'
    });
  }
};

module.exports = partnerAuth;