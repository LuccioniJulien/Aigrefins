const express = require('express');
const router = express.Router();

const db = require('../database/init');
const user = require('../database/models/users.js');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/signup', (req, res) => {
  res.render('create');
});

router.post('/add-user', (req, res) => {
  db.sequelize.models.users
    .create(req.body)
    .then(function(data) {
      res.status(200);
    })
    .catch(function(error) {
      res.status(500);
    });
  res.end();
});

module.exports = router;
