const hal = require('hal');

const root = 'v1';

exports.Position = class Position extends hal.Resource {
  constructor(data) {
    delete data.createdAt;
    delete data.updatedAt;
    super(data, `${root}/positions/${data.ID}`);
  }
};

exports.PositionsList = class PositionsList extends hal.Resource {
  constructor(url, positions) {
    super({}, url);
    if (positions.length) this.embed('positions', positions);
  }
};