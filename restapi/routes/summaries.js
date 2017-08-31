const express = require('express');
const router = new express.Router();

const summaryCtrl = require('../controllers').summaryCtrl;

// Routes
router.route('/')
  .get(summaryCtrl.list);

router.route('/:id')
  .get(summaryCtrl.get);

module.exports = router;
