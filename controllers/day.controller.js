const hal = require('hal');

const models = require('../models');

const root = 'v1';

class Day extends hal.Resource {
  constructor(data) {
    delete data.createdAt;
    delete data.updatedAt;
    super(data, `${root}/staff/${data.ID}`);
  }
}

class DaysList extends hal.Resource {
  constructor(url, days) {
    super({}, url);
    if (days.length) this.embed('days', days);
  }
}

exports.get = function get(req, res) {
  models.Day.findAll()
    .then(days => {
      days = days.map(day => {
        return new Day(day.dataValues);
      });
      const resource = new DaysList(req.originalUrl, days);
      res.json(resource);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.find = function find(req, res) {
  models.Day.findById(req.params.id)
    .then(day => {
      const resource = new Day(day.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
