const queryParser = require('../query-parser');
const models = require('../../db/models');
const resources = require('../resources');
const errors = require('../errors');
const sequelize = require('../../db/connection').sequelize;

/**
 * Create a day, positions and summaries from one 'standup' object.
 *
 * @method create
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.create = function create(req, res, next) {

  let day;

  return sequelize.transaction(function (t) {

    // chain all your queries here. make sure you return them.
    // transaction t passed as option to all queries
    return models.Day
      .create({
        date: req.body.date
      }, { transaction: t })
      .then(function (value) {
        day = value.dataValues;
        const positionsWithID = req.body.positions.map(position => {
          position.dayID = day.ID;
          return position;
        })
        return models.Position.bulkCreate(positionsWithID, { transaction: t });
      })
      .then(function (positions) {
        const summariesWithID = req.body.summaries.map(summary => {
          summary.dayID = day.ID;
          return summary;
        })
        return models.Summary.bulkCreate(summariesWithID, { transaction: t });
      })
  }).then(function (result) {
    const resource = new resources.standups.Create(day);
    res.status(201).json(resource);
  }).catch(function (err) {
    next(err);
  });
};