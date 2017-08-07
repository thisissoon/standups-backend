const hal = require('hal');
const Logger = require('logger').Logger;

const models = require('../models');
const logger = new Logger();
logger.debugLevel = 'warn';

const root = 'v1';

class StaffMember extends hal.Resource {
  constructor(data) {
    delete data.createdAt;
    delete data.updatedAt;
    super(data, `${root}/staff-member/${data.ID}`);
  }
}

class StaffMembersList extends hal.Resource {
  constructor(url, staffMembers) {
    super({}, url);
    if (staffMembers.length) this.embed('staffMembers', staffMembers);
  }
}

exports.get = function get(req, res) {
  models.StaffMember.findById(req.params.id)
    .then(staffMember => {
      const resource = new StaffMember(staffMember.dataValues);
      res.status(200).json(resource);
    })
    .catch(err => {
      res.status(500).json(err);
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
  models.StaffMember.findAll()
    .then(staffMembers => {
      staffMembers = staffMembers.map(staffMember => {
        return new StaffMember(staffMember.dataValues);
      });
      const resource = new StaffMembersList(req.originalUrl, staffMembers);
      res.json(resource);
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

