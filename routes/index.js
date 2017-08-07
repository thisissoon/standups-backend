'use strict';

const express = require('express');
const router = new express.Router();

const staffMembers = require('./staff-members');

// API Gateway Routes
router.use('/staff-members', staffMembers);

module.exports = router;
