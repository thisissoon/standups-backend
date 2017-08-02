const models = require('../models/index');

models.StaffMember
  .create({ 
    firstName: 'Jack', 
    lastName: 'Matthews', 
    role: 'Dev'
  })
  .then(() => {
    return models.StaffMember
      .create({
        firstName: 'Ken',
        lastName: 'Shaw',
        role: 'Designer'
      });
  })
  .then(() => console.log('finished'));