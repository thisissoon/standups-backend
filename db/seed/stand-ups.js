const models = require('../models/index');
const logger = require('../../logger').logger;

function saveStandUps(standUps){
  const promises = standUps.map((standUp, index) => {
    return saveStandUp(standUp, index)
      .then(() => logger.log('info', `standup ${++index} saved`));
  });
  return Promise.all(promises);
}

function saveStandUp(standUp, index) {
  return models.Day.create({ date: standUp.date })
    .then(day => {
      const positionPromise = savePositions(models.Position, standUp.positions, day.dataValues.ID);
      const summaryPromise = saveSummaries(models.Summary, standUp.summaries, day.dataValues.ID);
      return Promise.all([positionPromise, summaryPromise]);
    })
    .catch(err => {
      logger.log('error', `${err.errors[0].message}. Standup ${++index} (with date ${standUp.date}) was not saved.`);
      process.exit(1);
    });
}

function saveSummaries(Summary, namesArray, dayID) {
  const promises = namesArray.map((firstName, orderIndex) => {
    return saveSummary(Summary, dayID, firstName, orderIndex);
  });
  return Promise.all(promises);
}

function saveSummary(Summary, dayID, firstName, orderIndex) {
  return getStaffID(firstName)
    .then(staffID => Summary.create({ orderIndex, staffID, dayID }))
    .then(object => {
      logger.log('success', `summary saved.`);
      return object.dataValues;
    })
    .catch(err => {
      logger.log('error', err);
      process.exit(1);
    });
}

function savePositions(Position, namesArray, dayID) {
  const promises = namesArray.map((firstName, placeIndex) => {
    return savePosition(Position, dayID, firstName, placeIndex);
  });
  return Promise.all(promises);
}

function savePosition(Position, dayID, firstName, placeIndex) {
  return getStaffID(firstName)
    .then(staffID => Position.create({ placeIndex, staffID, dayID }))
    .then(object => {
      logger.log('success', `position saved.`);
      return object.dataValues;
    })
    .catch(err => {
      logger.log('error', err);
      process.exit(1);
    });
}

function getStaffID(firstName) {
  return models.StaffMember.findOne({ where: { firstName: firstName.toLowerCase() } })
    .then(staffMember => {
      if (!staffMember) throw `staffMember "${firstName}" cannot be found. Please seed "${firstName}".`;
      return staffMember.dataValues.ID;
    })
    .catch(err => {
      logger.log('error', err);
      process.exit(1);
    });
}

exports.saveStandUps = saveStandUps;