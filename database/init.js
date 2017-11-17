const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const _ = require('lodash');

let db = {};

const config = require(path.join(__dirname, 'config.json'));

db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

let model_pathname = path.join(__dirname, 'models');

fs
  .readdirSync(model_pathname)
  .filter(filename => {
    return filename.indexOf('.') !== 0;
  })
  .forEach(filename => {
    let model = db.import(path.join(model_pathname, filename));
    db[model.name] = model;
  });

db.modules.belongsToMany(db.users, {
  through: db.users_modules,
  as: 'idModule',
  foreignKey: 'idModule'
});
db.users.belongsToMany(db.modules, {
  through: db.users_modules,
  as: 'idUsers',
  foreignKey: 'idUser'
});
db.users.belongsToMany(db.users, {
  through: db.messengers,
  as: 'idSender',
  foreignKey: 'idSender'
});
db.users.belongsToMany(db.users, {
  through: db.messengers,
  as: 'idRecipient',
  foreignKey: 'idRecipient'
});
//insert into modules with data from modules.json
let moduleJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'modules.json'), 'utf8'));
db.modules
  .bulkCreate(moduleJson)
  .catch(function(err) {
    console.log(err);
  })
  .finally(function(err) {
    console.log('done');
  });
//db.queryInterface.bulkInsert('modules', moduleJson);
module.exports = db;
