const hal = require('hal');

const getPagination = require('../pagination').get;

const root = 'v1/days';

exports.Day = class Day extends hal.Resource {
  constructor(data) {
    delete data.createdAt;
    delete data.updatedAt;
    super(data, `${root}/${data.ID}`);
  }
};

exports.DaysList = class DaysList extends hal.Resource {
  constructor(url, days, currentPage, limit, count) {
    const pagination = getPagination(currentPage, limit, count);
    super(pagination, url);
    if (days.length) this.embed('days', days);
  }
};

