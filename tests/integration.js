const Server = require('../app');

// Load fixtures
require('./fixtures/staff-members.js');

// Bootstrap app for test run
const server = new Server(5050);
server.run();
