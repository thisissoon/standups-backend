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
