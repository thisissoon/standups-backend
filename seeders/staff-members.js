const Logger = require('logger').Logger;

const models = require('../models/index');
const sequelize = require('../db/db.config.js').sequelize;
const staffMembers = require('./staff-members.json');

const logger = new Logger();
logger.debugLevel = 'success';

sequelize.query('DELETE FROM "Position"')
  .then(sequelize.query('DELETE FROM "Day"'))
  .then(sequelize.query('DELETE FROM "Summary"'))
  .then(sequelize.query('DELETE FROM "StaffMember"'))
  .then(() => saveStaffMembers(staffMembers))
  .then(() => process.exit())
  .catch(err => {
    logger.log('error', err);
    process.exit();
  });

function saveStaffMembers(staffMembers){
  const promises = staffMembers.map((staffMember, index) => {
    return saveStaffMember(staffMember, index);
  });
  return Promise.all(promises);
}

function saveStaffMember(staffMember, index) {
  return models.StaffMember.create(staffMember)
    .then(staffMemberObject => {
      logger.log('success', `${staffMemberObject.dataValues.fullName} was saved.`);
      return staffMemberObject.dataValues;
    })
    .catch(err => {
      logger.log('error', `${err.errors[0].message}. StaffMember ${++index} was not saved.`);
      return err.errors;
    });
}