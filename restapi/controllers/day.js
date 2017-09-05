const queryParser = require('../query-parser');
const models   = require('../../db/models');
const resources  = require('../resources');
const errors = require('../errors');

/**
 * List all days.
 *
 * @method list
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.list = function get(req, res, next) {
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const currentPage = req.query.page ? parseInt(req.query.page) : 1;
  const query = queryParser.findAndCountAll(req.query, limit);
  models.Day.findAndCountAll(query)
    .then(result => {
      const days = result.rows.map(day => {
        return new resources.days.Day(day.dataValues);
      });
      const resource = new resources.days.List(req.originalUrl, days, currentPage, limit, result.count);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Create a new day.
 *
 * @method create
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.create = function create(req, res, next) {
  models.Day.create(req.body)
    .then(day => {
      const resource = new resources.days.Create(day.dataValues);
      res.status(201).json(resource);
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
exports.get = function find(req, res, next) {
  models.Day.findById(req.params.id)
    .then(day => {
      if (!day) throw new errors.NotFound();
      const resource = new resources.days.Day(day.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Update a specific day
 *
 * @method update
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.update = function update(req, res, next) {
  models.Day.findById(req.params.id)
    .then(day => {
      if (!day) throw new errors.NotFound();
      return day.update(req.body);
    })
    .then(day => {
      const resource = new resources.days.Day(day.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Delete a specific day
 *
 * @method delete
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.delete = (req, res, next) => {
  models.Day.findById(req.params.id)
    .then(day => {
      if (!day) throw new errors.NotFound();
      return day.destroy();
    })
    .then(noDestroyed => {
      res.status(204).json(noDestroyed);
    })
    .catch(err => {
      next(err);
    });
};
