const express = require('express');
const router = new express.Router();

const standUpCtrl = require('../controllers').standUpCtrl;

// Routes
router.route('/')
  .get(standUpCtrl.get);

router.route('/:id')
  .get(standUpCtrl.find);

module.exports = router;
