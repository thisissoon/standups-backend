const hal = require('hal');

const getPagination = require('../pagination').get;

const root = 'v1/positions';

exports.Position = class Position extends hal.Resource {
  constructor(data) {
    delete data.createdAt;
    delete data.updatedAt;
    super(data, `${root}/${data.ID}`);
  }
};

exports.PositionsList = class PositionsList extends hal.Resource {
  constructor(url, positions, currentPage, limit, count) {
    const pagination = getPagination(currentPage, limit, count);
    super(pagination, url);
    if (positions.length) this.embed('positions', positions);
  }
};