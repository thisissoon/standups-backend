const express = require('express');
const router = new express.Router();

const summaryCtrl = require('../controllers').summaryCtrl;

// Routes
router.route('/')
  .get(summaryCtrl.get);

router.route('/:id')
  .get(summaryCtrl.find);

module.exports = router;
