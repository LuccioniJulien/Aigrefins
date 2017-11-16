module.exports = (sequelize, DataTypes) => {
  let modules = sequelize.define('modules', {
    teacher: DataTypes.STRING,
    name: DataTypes.STRING
  });
  return modules;
};
