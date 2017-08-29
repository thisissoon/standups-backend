const models           = require('../models');
const StaffMember      = require('../resources').StaffMember;
const StaffMembersList = require('../resources').StaffMembersList;
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
  const order = parseOrder(req.query.sort);
  delete req.query.sort;
  models.StaffMember.findAll({where: req.query, order: order})
    .then(staffMembers => {
      staffMembers = staffMembers.map(staffMember => {
        return new StaffMember(staffMember.dataValues);
      });
      const resource = new StaffMembersList(req.originalUrl, staffMembers);
      res.json(resource);
    })
    .catch((err) => {
      next(err);
    });
};

exports.create = function create(req, res) {
  models.StaffMember.create(req.body)
    .then(staffMember => {
      const resource = new StaffMember(staffMember.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.find = function find(req, res) {
  models.StaffMember.findById(req.params.id)
    .then(staffMember => {
      const resource = new StaffMember(staffMember.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.update = function update(req, res) {
  models.StaffMember.findById(req.params.id)
    .then(staffMember => {
      return staffMember.update(req.body);
    })
    .then(staffMember => {
      const resource = new StaffMember(staffMember.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.delete = (req, res) => {
  models.StaffMember.findById(req.params.id)
    .then(staffMember => {
      return staffMember.destroy();
    })
    .then(noDestroyed => {
      res.status(200).json(noDestroyed);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

