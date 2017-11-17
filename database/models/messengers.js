module.exports = (sequelize, DataTypes) => {
  let messenger = sequelize.define('messengers', {
    content: DataTypes.STRING
  });
  return messenger;
};
