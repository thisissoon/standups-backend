const models = require('../models');

models.Staff.create({
  first_name: 'Jack',
  last_name: 'Matthews',
  role: 'Developer'
}, {
  fields: ['first_name', 'last_name', 'role']
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

let dayId;
let staffId;

models.Day.findAll().then(days => {
  dayId = days[0].id;
  models.Staff.findAll().then(staff => {
    staffId = staff[0].id;
    models.Summary.create({
      order: 1,
      day_id: dayId,
      staff_id: staffId
    }).then(insertedSummary => {
      console.log(insertedSummary);
    });
  });
});


