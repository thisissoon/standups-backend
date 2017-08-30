const express = require('express');
const router = new express.Router();

const staffMembers = require('./staff-members');
const days = require('./days');
const positions = require('./positions');
const summaries = require('./summaries');
const standUps = require('./stand-ups');

// API Routes
router.use('/v1/staff-members', staffMembers);
router.use('/v1/days', days);
router.use('/positions', positions);
router.use('/summaries', summaries);
router.use('/stand-ups', standUps);

module.exports = router;
