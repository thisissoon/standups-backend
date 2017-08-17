const models        = require('../models');
const Summary       = require('../resources').Summary;
const SummariesList = require('../resources').SummariesList;

exports.get = function get(req, res) {
  models.Summary.findAll({ where: req.query })
    .then(summaries => {
      summaries = summaries.map(summary => {
        return new Summary(summary.dataValues);
      });
      const resource = new SummariesList(req.originalUrl, summaries);
      res.json(resource);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.find = function find(req, res) {
  models.Summary.findById(req.params.id)
    .then(summary => {
      const resource = new Summary(summary.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
