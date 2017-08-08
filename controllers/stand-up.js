const hal = require('hal');

const models = require('../models');
const httpPromise = require('../test');

const root = 'v1';

class StandUp extends hal.Resource {
  constructor(day, positions, summaries) {
    super({}, `${root}/standUps`);
    this.embed('day', day);
    this.embed('positions', positions);
    this.embed('summaries', summaries);
  }
}

class StandUpsList extends hal.Resource {
  constructor(url, standUps) {
    super({}, url);
    if (standUps.length) this.embed('standUps', standUps);
  }
}

exports.get = function get(req, res) {
  httpPromise('http://localhost:3000/staff-members').then(value => console.log('outside', value));
};


/*
  http days
  .then
    map
      used day ID to make request to positions DB
        strip out unused bits
      use day ID to make request to summaries
        strip out unused bits
      return promise.all[day, positions, summaries]
      .then
        return construct standUp reasource with class (day, position, summaries)
  .then
    construct standUpList with class (url, standUps)
    res.status standUpListResource


*/