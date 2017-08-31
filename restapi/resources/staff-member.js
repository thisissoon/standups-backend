const hal = require('hal');

const root = 'v1/staff-members';

exports.StaffMember = class StaffMember extends hal.Resource {
  constructor(data) {
    delete data.createdAt;
    delete data.updatedAt;
    super(data, `${root}/${data.ID}`);
  }
};

exports.List = class List extends hal.Resource {
  constructor(url, staffMembers) {
    super({}, url);
    this.embed('staffMembers', staffMembers);
  }
};

exports.Create = class Create extends hal.Resource {
  constructor(data) {
    super({}, root);
    this.link('staffMember', `${root}/${data.ID}`);
  }
};