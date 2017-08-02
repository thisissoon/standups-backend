const models = require('../models/index');
const parserMethods = require('../parser/parser-methods');

const jsonFileName = parserMethods.getFileName(`${__dirname}/../parser/output`);

const daysArray = require(`../parser/output/${jsonFileName}`);

function saveStandups(standupsArray, index) {
  return models.Day.create({date: standupsArray[index].date})
    .then(day => {
      savePositions(standupsArray[index].positions, 0, day.dataValues.ID);
    })
    .then(() => {
      if (index < standupsArray.length - 1) {
        saveStandups(standupsArray, ++index);
      } else {
        return new Promise(resolve => {
          resolve();
        });
      }
    });
}

function savePositions(positions, placeIndex, dayID) {
  const positionObjects = [];
  return getStaffID(positions[placeIndex])
    .then(staffID => {
      return models.Position.create({staffID, dayID, placeIndex});
    })
    .then(position => {
      positionObjects.push(position);
      if (placeIndex < positions.length - 1) {
        savePositions(positions, ++placeIndex, dayID);
      } else {
        return new Promise(resolve => {
          resolve(positionObjects);
        });
      }
    });
}

function getStaffID(firstName){
  return models.StaffMember.findOne({where: {firstName}})
    .then(staffMember => {
      return new Promise(resolve => {
        resolve(staffMember.dataValues.ID);
      });
    });
}

saveStandups(daysArray, 0)
  .then(() => console.log('complete?'));