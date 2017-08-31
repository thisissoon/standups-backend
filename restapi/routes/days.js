const express = require('express');
const router = new express.Router();

const dayCtrl = require('../controllers').dayCtrl;

// Routes
router.route('/')
  .get(dayCtrl.list);

router.route('/:id')
  .get(dayCtrl.get);

module.exports = router;
