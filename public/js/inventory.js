module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define("Inventory", {
    product_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1, 10]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [1],
        notEmpty: true
      }
    },
    SF_Box: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,10],
        notEmpty: true
      }
    },
    dimension: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1,500],
      notEmpty: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
      len: [1],
      notEmpty: true
      }
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
      len: [1],
      notEmpty: true
      }
    }
  });
  return Inventory;
};