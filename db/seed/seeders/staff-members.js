const models = require('../../models/index');
const logger = require('../../../logger').logger;

function saveStaffMembers(staffMembers){
  const promises = staffMembers.map((staffMember, index) => {
    return saveStaffMember(staffMember, index);
  });
  return Promise.all(promises);
}

function saveStaffMember(staffMember, index) {
  return models.StaffMember.create(staffMember)
    .then(staffMemberObject => {
      logger.log('success', `${staffMemberObject.firstName} ${staffMemberObject.lastName} was saved.`);
      return staffMemberObject.dataValues;
    })
    .catch(err => {
      logger.log('error', `${err.errors[0].message}. StaffMember ${++index} was not saved.`);
      process.exit(1);
    });
}

exports.saveStaffMembers = saveStaffMembers;