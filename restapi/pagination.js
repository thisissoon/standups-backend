/**
 * 
 * @param {Number} currentPage
 * @param {Number} limit
 * @param {Number} count
 */
exports.get = function get(currentPage, limit, count) {
  return {
    currentPage,
    limit,
    total: count,
    pages: Math.ceil(count / limit)
  };
};