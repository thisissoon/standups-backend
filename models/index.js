const Day = require('./day.model');
const Position = require('./position.model').Position;
const StaffMember = require('./staff-member.model').StaffMember;
const Summary = require('./summary.model').Summary;

Day.hasMany(Position, {as: 'Positions', foreignKey: 'dayID', sourceKey: 'ID'});
Position.belongsTo(Day, {as: 'Day', foreignKey: 'dayID', targetKey: 'ID'});

Day.hasMany(Summary, {as: 'Summaries', foreignKey: 'dayID', sourceKey: 'ID'});
Summary.belongsTo(Day, {as: 'Day', foreignKey: 'dayID', targetKey: 'ID'});

module.exports = {
  Day,
  Position,
  StaffMember,
  Summary
};