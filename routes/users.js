const express = require('express');
const router  = express.Router();
const request = require('request');

const db = require('../database/init');

router.post('/create_user', (req,res) => {
	
});

router.get('/dashboard', (req,res) => {
    let url = 'http://quotes.stormconsultancy.co.uk/random.json';

    request(url, (error, response, body) => {
      res.render('dashboard', {message: JSON.parse(body)})
    })
})

router.get('/profil', (req,res) => {
    res.render('profil');
});
router.get('/edit_profile', (req,res) => {
res.render('edit_profile');
})
router.get('/messenger', (req,res) => {
    res.render('messenger');
});
router.get('/modules', (req,res) => {
    res.render('modules');
});
router.get('/logout', (req,res) => {
    res.render('index');
    res.redirect('/');
});

module.exports = router;
