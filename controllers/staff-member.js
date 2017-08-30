const models           = require('../models');
const StaffMember = require('../resources').StaffMemberResources.StaffMember;
const StaffMembersList = require('../resources').StaffMemberResources.StaffMembersList;
const StaffMemberCreate = require('../resources').StaffMemberResources.StaffMemberCreate;
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
 * List all staff members.
 *
 * @method list
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.list = function list(req, res, next) {
  const order = req.query.sort? parseOrder(req.query.sort) : null;
  delete req.query.sort;
  models.StaffMember.findAll({where: req.query, order: order})
    .then(staffMembers => {
      staffMembers = staffMembers.map(staffMember => {
        return new StaffMember(staffMember.dataValues);
      });
      const resource = new StaffMembersList(req.originalUrl, staffMembers);
      res.status(200).json(resource);
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * Create a new staff member.
 *
 * @method create
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.create = function create(req, res, next) {
  models.StaffMember.create(req.body)
    .then(staffMember => {
      const resource = new StaffMemberCreate(staffMember.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Retrieve a specific staff member
 *
 * @method get
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.get = function get(req, res, next) {
  models.StaffMember.findById(req.params.id)
    .then(staffMember => {
      if (!staffMember) throw new errors.NotFound();
      const resource = new StaffMember(staffMember.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Update a specific staff member
 *
 * @method update
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.update = function update(req, res, next) {
  models.StaffMember.findById(req.params.id)
    .then(staffMember => {
      if (!staffMember) throw new errors.NotFound();
      return staffMember.update(req.body);
    })
    .then(staffMember => {
      const resource = new StaffMember(staffMember.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Delete a specific staff member
 *
 * @method delete
 * @param {Object}   req  Express Request
 * @param {Object}   res  Express Response
 * @param {Function} next Callback to continue middleware chain
 */
exports.delete = (req, res, next) => {
  models.StaffMember.findById(req.params.id)
    .then(staffMember => {
      if (!staffMember) throw new errors.NotFound();
      return staffMember.destroy();
    })
    .then(noDestroyed => {
      res.status(204).json(noDestroyed);
    })
    .catch(err => {
      next(err);
    });
};

