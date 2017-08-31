const models        = require('../models');
const Position      = require('../resources').PositionResource.Position;
const PositionsList = require('../resources').PositionResource.PositionsList;
const errors = require('../restapi/errors');

/**
 * 
 * @param {String} string Sort string from request URL 
 */
function parseOrder(string) {
  const array = string.split(':');
  array[1] = array[1].toUpperCase();
  return [array];
}

/**
 * List all positions.
 *
 * @method list
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.list = function list(req, res, next) {
  const order = req.query.sort ? parseOrder(req.query.sort) : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : 200;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const offset = (page - 1) * limit;
  delete req.query.sort;
  delete req.query.limit;
  delete req.query.page;
  models.Position.findAndCountAll({ where: req.query, order, limit, offset })
    .then(result => {
      const positions = result.rows.map(position => {
        return new Position(position.dataValues);
      });
      const resource = new PositionsList(req.originalUrl, positions);
      resource.currentPage = page;
      resource.limt = limit;
      resource.total = result.count;
      resource.pages = Math.ceil(result.count / limit);
      res.json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Retrieve a specific day
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
      const resource = new Position(position.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};
