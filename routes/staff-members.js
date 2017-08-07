'use strict';

const express = require('express');
const router = new express.Router();

const staffMemberCtrl = require('../controllers').staffMemberCtrl;

// Routes
router.route('/')
  .get(staffMemberCtrl.find)
  .post(staffMemberCtrl.create);

router.route('/:id')
  .get(staffMemberCtrl.get)
  .put(staffMemberCtrl.update)
  .delete(staffMemberCtrl.delete);

module.exports = router;
