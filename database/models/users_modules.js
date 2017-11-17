module.exports = (sequelize, DataTypes) => {
  let user_module = sequelize.define('users_modules', {});

  return user_module;
};
