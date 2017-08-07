const express = require('express');
const router = new express.Router();

const dayCtrl = require('../controllers').dayCtrl;

// Routes
router.route('/')
  .get(dayCtrl.get);

router.route('/:id')
  .get(dayCtrl.find);

module.exports = router;
