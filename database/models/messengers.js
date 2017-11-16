module.exports = (sequelize, DataTypes) => {
  let messengers = sequelize.define('messengers', {
    content: DataTypes.STRING
  });
  return messengers;
};
