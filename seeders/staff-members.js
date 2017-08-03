const Logger = require('logger').Logger;

const models = require('../models/index');
const sequelize = require('../db/db.config.js').sequelize;
const staffMembers = require('./staff-members.json');

const logger = new Logger();
logger.debugLevel = 'success';

function saveStaffMembers(staffMembers){
  const promises = staffMembers.map(staffMember => {
    return models.StaffMember.create(staffMember)
      .catch(err => err);
  });
  return Promise.all(promises);
}

function logStaffMemberObject(staffMemberObject, index) {
  if (staffMemberObject.errors) {
    return logger.log('error', `${staffMemberObject.errors[0].message}. StaffMember ${++index} was not saved.`);
  }
  logger.log('success', `${staffMemberObject.dataValues.fullName} was saved.`);
}

sequelize.query('DELETE FROM "StaffMember"')
  .then(() => saveStaffMembers(staffMembers))
  .then(staffMemberObjects => {
    staffMemberObjects.forEach((staffMemberObject, index) => {
      logStaffMemberObject(staffMemberObject, index);
    });
    process.exit();
  })
  .catch(err => {
    logger.log('error', err);
    process.exit();
  });