module.exports = (sequelize, DataTypes) => {
  let module = sequelize.define('modules', {
    teacher: DataTypes.STRING,
    name: DataTypes.STRING
  });
  return module;
};
