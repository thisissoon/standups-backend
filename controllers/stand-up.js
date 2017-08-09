const hal = require('hal');

const models = require('../models');
const Day = require('../resources').Day;
const DaysList = require('../resources').DaysList;
const Position = require('../resources').Position;
const PositionsList = require('../resources').PositionsList;
const Summary = require('../resources').Summary;
const SummariesList = require('../resources').SummariesList;

const root = 'v1';

class StandUp {
  constructor(day, positions, summaries) {
    return {day, positions, summaries};
  }
}

class StandUpsList extends hal.Resource {
  constructor(url, standUps) {
    super({}, url);
    if (standUps.length) this.embed('standUps', standUps);
  }
}

exports.get = function get(req, res) {

  const ID = req.query.dayID;
  
  const day = models.Day.findAll({ where: {ID} })
    .then(days => {
      const resource = new Day(days[0].dataValues);
      return resource;
    });
  const positions = models.Position.findAll({ where: req.query })
    .then(positions => {
      positions = positions.map(position => {
        return new Position(position.dataValues);
      });
      const resource = new PositionsList(req.originalUrl, positions);
      return resource;
    });
  const summaries = models.Summary.findAll({ where: req.query })
    .then(summaries => {
      summaries = summaries.map(summary => {
        return new Summary(summary.dataValues);
      });
      const resource = new SummariesList(req.originalUrl, summaries);
      return resource;
    });

  Promise.all([day, positions, summaries])
    .then(results => {
      const [day, positions, summaries] = results;
      console.log(day);
      const resource = new StandUp(day, positions, summaries);
      console.log(resource);
      res.status(200).json(resource);
    });
};

