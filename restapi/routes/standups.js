const express = require('express');
const router = new express.Router();

const standupCtrl = require('../controllers').standupCtrl;

// Routes
router.route('/')
  .post(standupCtrl.create);

module.exports = router;
