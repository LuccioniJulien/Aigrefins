const express = require('express');
const router = express.Router();

const db = require('../database/init');
const user = require('../database/models/users');

const fs = require('fs');

const request = require('request');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const path = require('path');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signin', (req, res) => {
  let isConected = false;
  let userForm = {
    userName: req.body.userName,
    password: req.body.password
  };
  console.log(userForm);
  db.users.findOne({ where: { userName: userForm.userName } }).then(data => {
    if (!data) {
      console.log('no data');
      res.render('signin');
    } else if (data.checkPassword(userForm.password)) {
      console.log('ok signin');

      /*
      req.session.user = req.session.user || [];
      console.log(req.session.user);
      if (_.indexOf(req.session.user, userForm.userName) != -1) {
        isConected == true;
      }
      console.log(isConected);
      */

      if (isConected) {
        res.render('signin');
      } else {
        console.log(data.userName);
        req.session.user = data.userName;
        let url = 'http://quotes.stormconsultancy.co.uk/random.json';
        request(url, (error, response, body) => {
          res.render('dashboard', { message: JSON.parse(body), user: req.session.user });
        });
      }
    } else {
      console.log('echec signin');
      res.render('signin');
    }
  });
});

router.get('/signup', (req, res) => {
  res.render('create');
});

router.post('/signup', (req, res) => {
  let userForm = {
    userName: req.body.userName,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation
  };
  console.log(req.body);

  db.users
    .create(userForm)
    .then(function(user) {
      console.log('ok ok ok ok');
      res.status(200);
      res.render('dashboard');
    })
    .catch(function(error) {
      console.log(error);
    });
});

module.exports = router;
