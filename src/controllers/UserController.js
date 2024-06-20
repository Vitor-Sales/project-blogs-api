const { UserService } = require('../services');

// function extractToken(bearerToken) {
//  return bearerToken.split(' ')[1];
// }

const create = async (req, res) => {
  const token = req.header('Authorization');
  // const extractedToken = extractToken(token);
  const newUserData = req.body;
  const newUser = await UserService.create(newUserData);
  console.log({ token });
  console.log({ token: token.split(' ')[1] });
  if (newUser === null) return res.status(409).json({ message: 'User already registered' });

  return res.status(201).json({ token });
};

module.exports = {
  create,
};