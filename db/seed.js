const Staff = require('../models/staff').Staff;

Staff.create({
  first_name: 'Jack',
  last_name: 'Matthews',
  role: 'Developer'
}, {
  fields: ['first_name', 'last_name', 'role']
}).then(instertedStaff => {
  console.log(instertedStaff.dataValues);
});
