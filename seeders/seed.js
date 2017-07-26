const models = require('../models/index');

console.log(models);

models.StaffMember.create({
  firstName: 'Jack',
  lastName: 'Matthews',
  role: 'Developer'
}, {
  fields: ['firstName', 'lastName', 'role']
}).then(instertedStaff => {
  console.log(instertedStaff.dataValues);
});

models.Day.create({
  date: Date.now()
}, {
  fields: ['date']
}).then(instertedDays => {
  console.log(instertedDays.dataValues);
});

let dayID;
let staffID;

models.Day.findAll().then(days => {
  dayID = days[0].ID;
  models.StaffMember.findAll().then(staffMembers => {
    staffID = staffMembers[0].ID;
    models.Summary.create({
      orderIndex: 1,
      dayID: dayID,
      staffID: staffID
    }).then(insertedSummary => {
      console.log(insertedSummary);
    });
  });
});


