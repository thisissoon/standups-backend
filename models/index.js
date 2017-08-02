const Day = require('./day.model');
const Position = require('./position.model').Position;
const StaffMember = require('./staff-member.model').StaffMember;
const Summary = require('./summary.model').Summary;

Day.hasMany(Position, {as: 'Positions', foreignKey: 'dayID', sourceKey: 'ID'});
Position.belongsTo(Day, {as: 'Day', foreignKey: 'dayID', targetKey: 'ID'});

StaffMember.hasMany(Position, {as: 'Positions', foreignKey: 'staffID', sourceKey: 'ID'});
Position.belongsTo(StaffMember, {as: 'StaffMember', foreignKey: 'staffID', targetKey: 'ID'});

Day.hasMany(Summary, {as: 'Summaries', foreignKey: 'dayID', sourceKey: 'ID'});
Summary.belongsTo(Day, {as: 'Day', foreignKey: 'dayID', targetKey: 'ID'});

StaffMember.hasMany(Summary, {as: 'Summaries', foreignKey: 'staffID', sourceKey: 'ID'});
Summary.belongsTo(StaffMember, {as: 'StaffMember', foreignKey: 'staffID', targetKey: 'ID'});

module.exports = {
  Day,
  Position,
  StaffMember,
  Summary
};