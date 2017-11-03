const express = require('express');
const router = new express.Router();

const staffMembers = require('./staff-members');
const days = require('./days');
const positions = require('./positions');
const summaries = require('./summaries');
const standups = require('./standups');

// API Routes
router.use('/v1/staff-members', staffMembers);
router.use('/v1/days', days);
router.use('/v1/positions', positions);
router.use('/v1/summaries', summaries);
router.use('/v1/standups', standups);

module.exports = router;
