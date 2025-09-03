const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Material = sequelize.define('Material', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  supplierId: {
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
    type: DataTypes.ENUM('sand', 'gravel', 'steel', 'concrete', 'bricks', 'timber', 'soil', 'stone', 'cement', 'other'),
    allowNull: false
  },
  pricePerUnit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  unit: {
    type: DataTypes.ENUM('cubic_meter', 'ton', 'kg', 'per_100_pieces', 'square_meter', 'linear_meter', 'bag', 'piece'),
    allowNull: false
  },
  minimumOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  availableQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  specifications: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  qualityCertifications: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  deliveryAreas: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  deliveryTimeframe: {
    type: DataTypes.STRING(100),
    defaultValue: '1-2 business days'
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  seoTitle: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  seoDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'materials',
  indexes: [
    {
      fields: ['category', 'isAvailable']
    },
    {
      fields: ['pricePerUnit']
    },
    {
      fields: ['supplierId']
    },
    {
      fields: ['name']
    }
  ]
});

module.exports = Material;