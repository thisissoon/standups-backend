'use strict';

const express = require('express');
const router = new express.Router();

const staffMemberCtrl = require('../controllers').staffMemberCtrl;

// Routes
router.get('/', staffMemberCtrl.find);
router.get('/:id', staffMemberCtrl.get);

module.exports = router;
