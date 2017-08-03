const models = require('../models/index');
const sequelize = require('../db/db.config.js').sequelize;

const staffMembers = require('./staff-members.json');

function saveStaffMembers(staffMembers){
  const promises = staffMembers.map(staffMember => {
    return models.StaffMember.create(staffMember)
      .catch(err => err);
  });
  return Promise.all(promises);
}

function logStaffMemberObject(staffMemberObject, index) {
  if (staffMemberObject.errors) {
    return console.log(`StaffMember ${++index} was not saved. Error: ${staffMemberObject.errors[0].message}`);
  }
  console.log(`${staffMemberObject.dataValues.fullName} was saved.`);
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
    console.log(err);
    process.exit();
  });