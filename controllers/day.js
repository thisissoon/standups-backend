const models   = require('../models');
const Day      = require('../resources').Day;
const DaysList = require('../resources').DaysList;

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
