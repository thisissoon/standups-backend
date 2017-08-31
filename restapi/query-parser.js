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
 * 
 * @param {Object} req Express http request object 
 */
exports.findAndCountAll = function findAndCountAll(queries, limit) {
  const copiedQueries = Object.assign({}, queries);
  const order = copiedQueries.sort ? parseOrder(copiedQueries.sort) : null;
  const page = copiedQueries.page ? parseInt(copiedQueries.page) : 1;
  const offset = limit? (page - 1) * limit : null;
  delete copiedQueries.sort;
  delete copiedQueries.limit;
  delete copiedQueries.page;
  return { where: copiedQueries, order, limit, offset };
};