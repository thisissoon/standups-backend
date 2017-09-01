const express = require('express');
const router = new express.Router();

const positionCtrl = require('../controllers').positionCtrl;

// Routes
router.route('/')
  .get(positionCtrl.list)
  .post(positionCtrl.create);

router.route('/:id')
  .get(positionCtrl.get)
  .put(positionCtrl.update)
  .delete(positionCtrl.delete);

module.exports = router;
