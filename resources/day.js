const hal = require('hal');

const root = 'v1';

exports.Day = class Day extends hal.Resource {
  constructor(data) {
    delete data.createdAt;
    delete data.updatedAt;
    super(data, `${root}/days/${data.ID}`);
  }
};

exports.DaysList = class DaysList extends hal.Resource {
  constructor(url, days) {
    super({}, url);
    if (days.length) this.embed('days', days);
  }
};