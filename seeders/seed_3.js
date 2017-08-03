const models = require('../models/index');
const sequelize = require('../db/db.config.js').sequelize;

const parserMethods = require('../parser/parser-methods');

const jsonFileName = parserMethods.getFileName(`${__dirname}/../parser/output`);

const standUps = require(`../parser/output/${jsonFileName}`);

const standUp = standUps[0];

function saveStandUp(standUp) {
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
        if (!staffMember) throw new Error(`staffMember "${firstName}" cannot be found`);
        const staffID = staffMember? staffMember.dataValues.ID : staffMember;
        return Model.create({[indexName]: index, staffID, dayID});
      });
  });
  return Promise.all(promises);
}

sequelize.query('DELETE FROM "Position", "Day", "Summary"')
  .then(() => saveStandUp(standUp))
  .then(([positionObjects, summaryObjects]) => {
    console.log('POSITIONS', positionObjects[0]);
    console.log('SUMMARIES', summaryObjects[0]);
    process.exit();
  })
  .catch(err => {
    console.log(err.message);
  });


/*
standup = {date, formations, summaries}

1. create date - done
2. send dateID with formations to be stored => return promise with formationObjects
  2.1 forEach on formation into a promise.all - done
  2.2 resolve with promiseObjects array - done
  2.3 handle error of no staff by name
3. send dateID with summaries to be stored => return promise with summaryObjects
  2.1 forEach on summaries into promise.all - done
  2.2 resolve with summaryObjects array - done
  2.3 handle error of no staff by name
4. Promise.all on the above - done
5. console.log success or error
6. respond with {dateObject, formationObjects, summaryObjects}

or 

6. query database to construct {date, formations, summmaries}

error handling 


*/

  // return position.getStaffMember();