const express = require('express');
const router = new express.Router();

const standUpCtrl = require('../controllers').standUpCtrl;

// Routes
router.route('/')
  .get(standUpCtrl.get);
//   .post(standUpCtrl.create);

module.exports = router;
