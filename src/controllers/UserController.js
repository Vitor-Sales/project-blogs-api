const jwt = require('jsonwebtoken');
const { UserService } = require('../services');

const secret = process.env.JWT_SECRET;

const withoutPassword = (data) => {
  const dataWithoutPassword = {
    id: data.dataValues.id,
    displayName: data.dataValues.displayName,
    email: data.dataValues.email,
    image: data.dataValues.image,
  };
  return dataWithoutPassword;
};

const create = async (req, res) => {
  // const extractedToken = extractToken(token);
  const newUserData = req.body;
  const newUser = await UserService.create(newUserData);
  if (!newUser) return res.status(409).json({ message: 'User already registered' });
  const userWithoutPassword = withoutPassword(newUser);
  const token = jwt.sign(userWithoutPassword, secret);

  res.status(201).json({ token });
  // console.log({ token });
//  try {
//    const token = req.header('Authorization');
//    const extractedToken = extractToken(token);
//    
//    return res.status(201).json({ token: extractedToken });
//  } catch (e) {
//    console.log(e.message);
//    res.status(500).json({ message: 'Server error' });
//  }
  // console.log({ token: token.split(' ')[1] })
};

const getAll = async (req, res) => {
  const allUsers = await UserService.getAll();

  return res.status(200).json(allUsers);
};

module.exports = {
  create,
  getAll,
};