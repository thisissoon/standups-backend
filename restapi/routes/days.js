const express = require('express');
const router = new express.Router();

const dayCtrl = require('../controllers').dayCtrl;

// Routes
router.route('/')
  .get(dayCtrl.list)
  .post(dayCtrl.create);

router.route('/:id')
  .get(dayCtrl.get)
  .put(dayCtrl.update)
  .delete(dayCtrl.delete);

module.exports = router;
