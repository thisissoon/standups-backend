const express = require('express');
const router = new express.Router();

const summaryCtrl = require('../controllers').summaryCtrl;

// Routes
router.route('/')
  .get(summaryCtrl.list)
  .post(summaryCtrl.create);

router.route('/:id')
  .get(summaryCtrl.get)
  .put(summaryCtrl.update)
  .delete(summaryCtrl.delete);

module.exports = router;
