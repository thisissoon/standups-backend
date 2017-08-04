const models = require('../models/index');
const sequelize = require('../db/db.config.js').sequelize;
const parserMethods = require('../parser/parser-methods');

const jsonFileName = parserMethods.getFileName(`${__dirname}/../parser/output`);
const standUps = require(`../parser/output/${jsonFileName}`);

sequelize.query('DELETE FROM "Position"')
  .then(sequelize.query('DELETE FROM "Day"'))
  .then(sequelize.query('DELETE FROM "Summary"'))
  .then(() => saveStandUps(standUps))
  .catch(err => console.log('WWWTTTTFFFFF', err));

function saveStandUps(standUps){
  const promises = standUps.map(standUp => {
    return saveStandUp(standUp);
  });
  return Promise.all(promises);
}

function saveStandUp(standUp) {
  return models.Day.create({ date: standUp.date })
    .then(day => {
      const positionPromise = savePositionsOrSummaries(models.Position, 'placeIndex', day.dataValues.ID, standUp.positions);
      const summaryPromise = savePositionsOrSummaries(models.Summary, 'orderIndex', day.dataValues.ID, standUp.positions);
      return Promise.all([positionPromise, summaryPromise]);
    });
}

function savePositionsOrSummaries(Model, indexName, dayID, namesArray) {
  const promises = namesArray.map((firstName, index) => {
    return savePositionOrSummary(Model, indexName, dayID, firstName, index);
  });
  return Promise.all(promises);
}

function savePositionOrSummary(Model, indexName, dayID, firstName, index) {
  return models.StaffMember.findOne({ where: { firstName } })
    .then(staffMember => {
      if (!staffMember) throw new Error(`staffMember "${firstName}" cannot be found`);
      const staffID = staffMember ? staffMember.dataValues.ID : staffMember;
      return Model.create({ [indexName]: index, staffID, dayID });
    });
}