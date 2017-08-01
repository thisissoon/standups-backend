const models = require('../models/index');
const parserMethods = require('../parser/parser-methods');

const jsonFileName = parserMethods.getFileName(`${__dirname}/../parser/output`);

const daysArray = require(`../parser/output/${jsonFileName}`);

const dayObject = daysArray[0];

let dayID;
let staffID;

models.Day.create({
  date: dayObject.date
}, {
  fields: ['date']
})
.then(day => {
  dayID = day.dataValues.ID;
  dayObject.positions.forEach((firstName, index) => {
    models.StaffMember.findOne({where: {firstName}})
      .then(staffMember => {
        staffID = staffMember.dataValues.ID;
        const position = {
          place_index: index,
          staffID: staffID,
          dayID: dayID 
        };
        return models.Position.create(position);
      })
      .then(position => {
        return position.getStaffMember();
      })
      .then(staffMember => {
        console.log(staffMember.dataValues);
      });
  });
});