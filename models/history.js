module.exports = function(sequelize, DataTypes) {
  var History = sequelize.define("History", {
     product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1, 10]
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
    date: {
      allowNull: false,
      type: DataTypes.DATE,
    }
    //should I just make it autoincrement with the date that the person person submits
  });
  return History;
};