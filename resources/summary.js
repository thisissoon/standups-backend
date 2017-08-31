const hal = require('hal');

const root = 'v1/summaries';

exports.Summary = class Summary extends hal.Resource {
  constructor(data) {
    delete data.createdAt;
    delete data.updatedAt;
    super(data, `${root}/${data.ID}`);
  }
};

exports.SummariesList = class SummariesList extends hal.Resource {
  constructor(url, summaries) {
    super({}, url);
    if (summaries.length) this.embed('summaries', summaries);
  }
};