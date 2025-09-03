const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ServiceRequest = sequelize.define('ServiceRequest', {
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
    type: DataTypes.ENUM('material', 'vehicle'),
    allowNull: false
  },
  materialId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'materials',
      key: 'id'
    }
  },
  vehicleId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'vehicles',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1
    }
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1
    }
  },
  durationType: {
    type: DataTypes.ENUM('hours', 'days'),
    allowNull: true
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'rejected'),
    defaultValue: 'pending'
  },
  requestDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  requiredDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  completedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contactDetails: {
    type: DataTypes.JSON,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  specialRequirements: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  assignedTo: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'partners',
      key: 'id'
    }
  },
  tracking: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      orderNumber: null,
      estimatedDelivery: null,
      actualDelivery: null,
      deliveryStatus: 'pending'
    }
  },
  payment: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      method: null,
      status: 'pending',
      transactionId: null,
      paidAmount: 0,
      paidDate: null
    }
  },
  feedback: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      rating: null,
      comment: null,
      date: null
    }
  },
  cancellation: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'service_requests',
  hooks: {
    beforeCreate: (serviceRequest) => {
      if (!serviceRequest.tracking.orderNumber) {
        const prefix = serviceRequest.type === 'material' ? 'MAT' : 'VEH';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        serviceRequest.tracking = {
          ...serviceRequest.tracking,
          orderNumber: `${prefix}-${timestamp}-${random}`
        };
      }
    }
  },
  indexes: [
    {
      fields: ['userId', 'status']
    },
    {
      fields: ['assignedTo', 'status']
    },
    {
      fields: ['requestDate']
    }
  ]
});

module.exports = ServiceRequest;