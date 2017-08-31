const queryParser = require('../query-parser');
const models = require('../../db/models');
const Summary       = require('../resources').SummaryResources.Summary;
const SummariesList = require('../resources').SummaryResources.SummariesList;
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
        return new Summary(summary.dataValues);
      });
      const resource = new SummariesList(req.originalUrl, summaries, currentPage, limit, result.count);
      res.json(resource);
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
      const resource = new Summary(summary.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};

