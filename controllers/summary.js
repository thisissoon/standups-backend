const models        = require('../models');
const Summary       = require('../resources').SummaryResources.Summary;
const SummariesList = require('../resources').SummaryResources.SummariesList;
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
 * List all summaries.
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
  models.Summary.findAndCountAll({ where: req.query, order, limit, offset })
    .then(result => {
      const summaries = result.rows.map(summary => {
        return new Summary(summary.dataValues);
      });
      const resource = new SummariesList(req.originalUrl, summaries);
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

