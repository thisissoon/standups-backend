const express = require('express');
const router = new express.Router();

const staffMembers = require('./staff-members');
const days = require('./days');

// API Routes
router.use('/staff-members', staffMembers);
router.use('/days', days);

module.exports = router;
