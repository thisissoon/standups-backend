const models = require('../models/index');

models.StaffMember
  .create({ 
    firstName: 'Jack', 
    lastName: 'Matthews',
    role: 'Dev',
    fullName: ''
  })
  .then(() => {
    return models.StaffMember
      .create({
        firstName: 'Ken',
        lastName: 'Shaw', 
        role: 'Designer',
        fullName: ''
      });
  })
  .then(() => {
    console.log('finished');
    process.exit();
  });