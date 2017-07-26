const models = require('../models/index');

let dayID;
let staffID;

models.StaffMember
.create({
  firstName: 'Jack',
  lastName: 'Matthews',
  role: 'Developer'
}, {
  fields: ['firstName', 'lastName', 'role']
})
.then(models.Day.create({
  date: Date.now()
}, {
  fields: ['date']
}))
.then(() => models.Day.findAll())
.then(days => {
  dayID = days[0].ID;
  return models.StaffMember.findAll();
})
.then(staffMembers => {
  staffID = staffMembers[0].ID;
  return models.Summary.create({
    orderIndex: 1,
    dayID: dayID,
    staffID: staffID
  });
})
.then(insertedSummary => {
  console.log(insertedSummary);
});