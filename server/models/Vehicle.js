const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'partners',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 200]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [10, 1000]
    }
  },
  category: {
    type: DataTypes.ENUM('excavator', 'truck', 'crane', 'bulldozer', 'loader', 'dump_truck', 'concrete_mixer', 'forklift', 'roller', 'other'),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  model: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1990,
      max: new Date().getFullYear() + 1
    }
  },
  pricePerHour: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  pricePerDay: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  specifications: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  location: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  availability: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      isAvailable: true,
      availableFrom: null,
      availableUntil: null,
      unavailableDates: []
    }
  },
  insurance: {
    type: DataTypes.JSON,
    allowNull: false
  },
  maintenance: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      lastService: null,
      nextService: null,
      serviceHistory: []
    }
  },
  certifications: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  operatorIncluded: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  operatorDetails: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  features: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
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
  status: {
    type: DataTypes.ENUM('active', 'maintenance', 'rented', 'inactive'),
    defaultValue: 'active'
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  }
}, {
  tableName: 'vehicles',
  indexes: [
    {
      fields: ['category', 'status']
    },
    {
      fields: ['pricePerHour', 'pricePerDay']
    },
    {
      fields: ['ownerId']
    },
    {
      fields: ['name']
    }
  ]
});

module.exports = Vehicle;