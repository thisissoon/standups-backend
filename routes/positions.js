const express = require('express');
const router = new express.Router();

const positionCtrl = require('../controllers').positionCtrl;

// Routes
router.route('/')
  .get(positionCtrl.list);

router.route('/:id')
  .get(positionCtrl.get);

module.exports = router;
