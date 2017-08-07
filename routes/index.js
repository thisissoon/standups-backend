const express = require('express');
const router = new express.Router();

const staffMembers = require('./staff-members');
const days = require('./days');
const positions = require('./positions');
const summaries = require('./summaries');

// API Routes
router.use('/staff-members', staffMembers);
router.use('/days', days);
router.use('/positions', positions);
router.use('/summaries', summaries);

module.exports = router;
