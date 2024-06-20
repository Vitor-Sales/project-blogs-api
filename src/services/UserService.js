const { User } = require('../models');

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  console.log(`user do getByEmail: ${user}`);
  return user;
};

const getByUserId = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

const getAll = async () => {
  const allUsers = await User.findAll();

  return allUsers;
};

const create = async (newUserData) => {
  const { email } = newUserData;

  const checkEmailInDB = await getByEmail(email);

  if (checkEmailInDB) {
    return null;
  }

  const newUser = await User.create(newUserData);

  return newUser;
};

module.exports = {
  getByEmail,
  getByUserId,
  create,
  getAll,
};