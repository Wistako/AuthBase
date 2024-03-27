const express = require('express');
const router = express.Router();

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/user/no-permission');
  }
});

router.get('/logged', (req, res) => {
  const {name, photos} = req.user;
  res.render('logged', { name, photos });
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

router.get('/profile/settings', (req, res) => {
  res.render('settings');
});


module.exports = router;