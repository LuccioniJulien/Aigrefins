module.exports = (sequelize, DataTypes) => {
  let users = sequelize.define('users', {
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  });
  return users;
};
