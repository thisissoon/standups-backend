const express = require('express');
const router = new express.Router();

const staffMemberCtrl = require('../controllers').staffMemberCtrl;

// Routes
router.route('/')
  .get(staffMemberCtrl.list)
  .post(staffMemberCtrl.create);

router.route('/:id')
  .get(staffMemberCtrl.find)
  .put(staffMemberCtrl.update)
  .delete(staffMemberCtrl.delete);

module.exports = router;
