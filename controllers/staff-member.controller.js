exports.find = function get(req, res) {
  res.json([{ reasource: 'staffMembers' }]);
};

exports.get = function get(req, res) {
  res.json([{ reasource: 'staffMember' }]);
};