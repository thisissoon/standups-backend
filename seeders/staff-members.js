const models = require('../models/index');

const staffMembers = require('./staff-members.json');

staffMembers.forEach(staffMember => {
  models.StaffMember
    .findOrCreate({where: {firstName: staffMember.firstName, lastName: staffMember.lastName, role: staffMember.role}})
    .spread((staffMember, created) => {
      console.log(staffMember.dataValues);
      console.log(created);
    });
});