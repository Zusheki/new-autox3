const { sequelize } = require('../config/database');
const User = require('./User');
const Partner = require('./Partner');
const Material = require('./Material');
const Vehicle = require('./Vehicle');
const ServiceRequest = require('./ServiceRequest');

// Define associations
User.hasOne(Partner, { foreignKey: 'userId', as: 'partner' });
Partner.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Partner.hasMany(Material, { foreignKey: 'supplierId', as: 'materials' });
Material.belongsTo(Partner, { foreignKey: 'supplierId', as: 'supplier' });

Partner.hasMany(Vehicle, { foreignKey: 'ownerId', as: 'vehicles' });
Vehicle.belongsTo(Partner, { foreignKey: 'ownerId', as: 'owner' });

User.hasMany(ServiceRequest, { foreignKey: 'userId', as: 'serviceRequests' });
ServiceRequest.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Material.hasMany(ServiceRequest, { foreignKey: 'materialId', as: 'requests' });
ServiceRequest.belongsTo(Material, { foreignKey: 'materialId', as: 'material' });

Vehicle.hasMany(ServiceRequest, { foreignKey: 'vehicleId', as: 'requests' });
ServiceRequest.belongsTo(Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });

Partner.hasMany(ServiceRequest, { foreignKey: 'assignedTo', as: 'assignedRequests' });
ServiceRequest.belongsTo(Partner, { foreignKey: 'assignedTo', as: 'assignedPartner' });

// Sync database
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✅ Database synchronized successfully');
  } catch (error) {
    console.error('❌ Database synchronization failed:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  Partner,
  Material,
  Vehicle,
  ServiceRequest,
  syncDatabase
};