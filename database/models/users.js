const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  let user = sequelize.define(
    'users',
    {
      userName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      birthDate: DataTypes.DATE,
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password_confirmation: {
        type: DataTypes.VIRTUAL,
        allowNull: false
      },
      phoneNumber: { type: DataTypes.STRING }
    },
    {
      hooks: {
        beforeCreate: user => {
          const bcrypt = require('bcrypt');
          if (user.password != user.password_confirmation) {
            throw "error passwords don't match";
          }
          let salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  );
  user.prototype.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  return user;
};
