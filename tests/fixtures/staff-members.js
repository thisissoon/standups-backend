const nock = require('nock');

const URL = 'http://localhost:5050';

// Staff Members
// List
nock(URL, { 'encodedQueryParams': true })
  .get('/staff-members')
  .query({ sort: 'firstName:asc' })
  .reply(200, { "message": "hi"});

// Create

// Get

// Update

// Delete
