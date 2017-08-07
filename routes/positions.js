const express = require('express');
const router = new express.Router();

const positionCtrl = require('../controllers').positionCtrl;

// Routes
router.route('/')
  .get(positionCtrl.get);

router.route('/:id')
  .get(positionCtrl.find);

module.exports = router;
