const { User } = require('../models');

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getByUserId = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

module.exports = {
  getByEmail,
  getByUserId,
};