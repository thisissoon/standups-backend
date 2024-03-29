var hooks = require('hooks');
var models = require('../../db/models');

hooks.beforeAll(function (transactions, done) {
  hooks.log('before all');
  models.StaffMember.bulkCreate([{
    firstName: 'foo',
    lastName: 'bar',
    role: 'developer',
    ID: 'bf4b3b30-792c-11e7-9e1d-b10f7e8a2b0a',
    current: false
  },
  {
    firstName: 'foofoo',
    lastName: 'barbar',
    role: 'developer',
    ID: 'bf4b3b30-792c-11e7-9e1d-b10f7e8a2b0b',
    current: true
  },
  {
    firstName: 'foofoofoo',
    lastName: 'barbarbar',
    role: 'developer',
    ID: 'bf4b3b30-792c-11e7-9e1d-b10f7e8a2b0c',
    current: true
  }])
  .then(() => {
    return models.Day.bulkCreate([{
      date: '1991-04-10T00:00:00.000Z',
      ID: 'bf4b3b30-792c-11e7-9e1d-b10f7e8a2b0a'
    },
    {
      date: '1991-04-11T00:00:00.000Z',
      ID: 'bf4b3b30-792c-11e7-9e1d-b10f7e8a2b0b'
    }]);
  })
  .then(() => {
    return models.Position.create({
      placeIndex: 1,
      staffID: 'bf4b3b30-792c-11e7-9e1d-b10f7e8a2b0a',
      dayID: 'bf4b3b30-792c-11e7-9e1d-b10f7e8a2b0a',
      ID: 'bf4b3b30-792c-11e7-9e1d-b10f7e8a2b0a'
    });
  })
  .then(() => {
    return models.Summary.create({
      orderIndex: 1,
      staffID: 'bf4b3b30-792c-11e7-9e1d-b10f7e8a2b0a',
      dayID: 'bf4b3b30-792c-11e7-9e1d-b10f7e8a2b0a',
      ID: 'bf4b3b30-792c-11e7-9e1d-b10f7e8a2b0a'
    });
  })
  .then(done)
  .catch(err => {
    console.log(err);
  });
});