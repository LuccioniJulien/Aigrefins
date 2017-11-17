const express = require('express');
const router = express.Router();
const request = require('request');

const db = require('../database/init');

router.post('/create_user', (req, res) => {});

router.get('/dashboard', (req, res) => {
  let url = 'http://quotes.stormconsultancy.co.uk/random.json';
  console.log(req.session.user);
  request(url, (error, response, body) => {
    res.render('dashboard', { message: JSON.parse(body), user: req.session.user });
  });
});

router.get('/profil', (req, res) => {
  res.render('profil');
});
router.get('/edit_profile', (req, res) => {
  db.users.findOne({ where: { userName: req.session.user } }).then(data => {
    res.render('edit_profile', { data });
  });
});
router.get('/messenger', (req, res) => {
  res.render('messenger');
});
router.get('/modules', (req, res) => {
  res.render('modules');
});
router.get('/logout', (req, res) => {
  res.render('index');
  res.redirect('/');
});

module.exports = router;
