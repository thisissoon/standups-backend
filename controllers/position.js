const models        = require('../models');
const Position      = require('../resources').Position;
const PositionsList = require('../resources').PositionsList;

exports.get = function get(req, res) {
  models.Position.findAll({ where: req.query })
    .then(positions => {
      positions = positions.map(position => {
        return new Position(position.dataValues);
      });
      const resource = new PositionsList(req.originalUrl, positions);
      res.json(resource);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.find = function find(req, res) {
  models.Position.findById(req.params.id)
    .then(position => {
      const resource = new Position(position.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
