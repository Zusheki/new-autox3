const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Partner = sequelize.define('Partner', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('vehicle_owner', 'material_supplier'),
    allowNull: false
  },
  businessName: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 200]
    }
  },
  businessLicense: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  taxId: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  yearsInBusiness: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [10, 2000]
    }
  },
  services: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  serviceAreas: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  address: {
    type: DataTypes.JSON,
    allowNull: false
  },
  contact: {
    type: DataTypes.JSON,
    allowNull: false
  },
  certifications: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  insurance: {
    type: DataTypes.JSON,
    allowNull: false
  },
  bankDetails: {
    type: DataTypes.JSON,
    allowNull: false
  },
  documents: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  verificationStatus: {
    type: DataTypes.ENUM('pending', 'under_review', 'approved', 'rejected', 'suspended'),
    defaultValue: 'pending'
  },
  verificationNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reviewedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reviewedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00,
    validate: {
      min: 0,
      max: 5
    }
  },
  ratingCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalJobs: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  completedJobs: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  cancelledJobs: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalEarnings: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0.00
  },
  responseTime: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Average response time in hours'
  },
  completionRate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
    comment: 'Completion rate percentage'
  },
  preferences: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      autoAcceptOrders: false,
      maxOrdersPerDay: 10,
      workingHours: {
        start: '08:00',
        end: '18:00'
      },
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      notifications: {
        email: true,
        sms: true,
        push: true
      }
    }
  },
  subscription: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      plan: 'basic',
      isActive: true
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'partners'
});

module.exports = Partner;