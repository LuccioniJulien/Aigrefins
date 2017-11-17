module.exports = (sequelize, DataTypes) => {
  let messenger = sequelize.define('messengers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    idSender: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: false
    },
    idRecipient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: false
    },
    content: DataTypes.STRING
  });
  return messenger;
};
