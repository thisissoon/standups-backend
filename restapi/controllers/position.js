const queryParser = require('../query-parser');
const models = require('../../db/models');
const resources = require('../resources');
const errors = require('../errors');

/**
 * List all positions.
 *
 * @method list
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.list = function list(req, res, next) {
  const limit = req.query.limit ? parseInt(req.query.limit) : 200;
  const currentPage = req.query.page ? parseInt(req.query.page) : 1;
  const query = queryParser.findAndCountAll(req.query, limit);
  models.Position.findAndCountAll(query)
    .then(result => {
      const positions = result.rows.map(position => {
        return new resources.positions.Position(position.dataValues);
      });
      const resource = new resources.positions.List(req.originalUrl, positions, currentPage, limit, result.count);
      res.json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Retrieve a specific position.
 *
 * @method get
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.get = function get(req, res, next) {
  models.Position.findById(req.params.id)
    .then(position => {
      if (!position) throw new errors.NotFound();
      const resource = new resources.positions.Position(position.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};
