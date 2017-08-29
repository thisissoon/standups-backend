const hal = require('hal');

const root = 'v1';

exports.StaffMember = class StaffMember extends hal.Resource {
  constructor(data) {
    delete data.createdAt;
    delete data.updatedAt;
    super(data, `${root}/staff-members/${data.ID}`);
  }
};

exports.StaffMembersList = class StaffMembersList extends hal.Resource {
  constructor(url, staffMembers) {
    super({}, url);
    this.embed('staffMembers', staffMembers);
  }
};