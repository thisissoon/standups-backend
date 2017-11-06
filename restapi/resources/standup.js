const hal = require('hal');

const root = 'v1/standups';

exports.Create = class Create extends hal.Resource {
  constructor(day) {
    super({}, root);
    delete day.createdAt;
    delete day.updatedAt;
    this.embed('days', [day])
  }
};
