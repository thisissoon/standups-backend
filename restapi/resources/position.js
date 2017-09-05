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

exports.List = class List extends hal.Resource {
  constructor(url, positions, currentPage, limit, count) {
    const pagination = getPagination(currentPage, limit, count);
    super(pagination, url);
    const pageArray = url.split(`page=${currentPage}`);
    const nextUrl = pageArray.join(`page=${++currentPage}`);
    this.link('next', nextUrl);
    if (positions.length) this.embed('positions', positions);
  }
};

exports.Create = class Create extends hal.Resource {
  constructor(data) {
    super({}, root);
    this.link('position', `${root}/${data.ID}`);
  }
};