const queryParser = require('../query-parser');
const models = require('../../db/models');
const resources = require('../resources');
const errors = require('../errors');

/**
 * List all summaries.
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
  models.Summary.findAndCountAll(query)
    .then(result => {
      const summaries = result.rows.map(summary => {
        return new resources.summaries.Summary(summary.dataValues);
      });
      const resource = new resources.summaries.List(req.originalUrl, summaries, currentPage, limit, result.count);
      res.json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Create a new summary.
 *
 * @method create
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.create = function create(req, res, next) {
  models.Summary.create(req.body)
    .then(summary => {
      const resource = new resources.summaries.Create(summary.dataValues);
      res.status(201).json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Retrieve a specific summary.
 *
 * @method get
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.get = function get(req, res, next) {
  models.Summary.findById(req.params.id)
    .then(summary => {
      if (!summary) throw new errors.NotFound();
      const resource = new resources.summaries.Summary(summary.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Update a specific summary
 *
 * @method update
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.update = function update(req, res, next) {
  models.Summary.findById(req.params.id)
    .then(summary => {
      if (!summary) throw new errors.NotFound();
      return summary.update(req.body);
    })
    .then(summary => {
      const resource = new resources.summaries.Summary(summary.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Delete a specific summary
 *
 * @method delete
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.delete = (req, res, next) => {
  models.Summary.findById(req.params.id)
    .then(summary => {
      if (!summary) throw new errors.NotFound();
      return summary.destroy();
    })
    .then(noDestroyed => {
      res.status(204).json(noDestroyed);
    })
    .catch(err => {
      next(err);
    });
};