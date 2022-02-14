'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {});
  Spot.associate = function (models) {
    Spot.belongsTo(models.User, { foreignKey: 'userId' })
    Spot.hasMany(models.Booking, { onDelete: 'cascade', hooks: true, foreignKey: 'spotId' })
    Spot.hasMany(models.Review, { onDelete: 'cascade', hooks: true, foreignKey: 'spotId' })
    Spot.hasMany(models.Image, { onDelete: 'cascade', hooks: true, foreignKey: 'spotId' })
  };




  return Spot;
};
