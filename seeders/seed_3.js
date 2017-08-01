const models = require('../models/index');
const parserMethods = require('../parser/parser-methods');

const jsonFileName = parserMethods.getFileName(`${__dirname}/../parser/output`);

const standUps = require(`../parser/output/${jsonFileName}`);

const standUp = standUps[0];

function saveStandup(standUp) {
  return models.Day.create({ date: standUp.date })
  .then(day => {
    const positionPromise = savePositionsOrSummaries(models.Position, 'placeIndex', day.dataValues.ID, standUp.positions);
    const summaryPromise = savePositionsOrSummaries(models.Summary, 'orderIndex', day.dataValues.ID, standUp.positions);
    return Promise.all([positionPromise, summaryPromise]);
  });
}

function savePositionsOrSummaries(Model, indexName, dayID, namesArray){
  const promises = namesArray.map((firstName, index) => {
    return models.StaffMember.findOne({where: {firstName}})
      .then(staffMember => {
        const staffID = staffMember.dataValues.ID;
        return Model.create({[indexName]: index, staffID, dayID});
      });
  });
  return Promise.all(promises);
}

saveStandup(standUp)
  .then(([positionObjects, summaryObjects]) => {
    console.log('POSITIONS', positionObjects[0].dataValues);
    console.log('SUMMARIES', summaryObjects[0].dataValues);
  });

/*
standup = {date, formations, summaries}

1. create date
2. send dateID with formations to be stored => return promise with formationObjects
  2.1 forEach on formation into a promise.all
  2.2 resolve with promiseObjects array
  2.3 handle error of no staff by name
3. send dateID with summaries to be stored => return promise with summaryObjects
  2.1 forEach on summaries into promise.all
  2.2 resolve with summaryObjects array
  2.3 handle error of no staff by name
4. Promise.all on the above
5. console.log success or error
6. respond with {dateObject, formationObjects, summaryObjects}

or 

6. query database to construct {date, formations, summmaries}


*/

  // return position.getStaffMember();