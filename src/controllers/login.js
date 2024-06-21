const jwt = require('jsonwebtoken');
const { UserService } = require('../services');

const secret = process.env.JWT_SECRET;

const isBodyValid = (email, password) => email && password;

const withoutPassword = (data) => {
  const dataWithoutPassword = {
    id: data.dataValues.id,
    displayName: data.dataValues.displayName,
    email: data.dataValues.email,
    image: data.dataValues.image,
  };
  return dataWithoutPassword;
};

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isBodyValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const user = await UserService.getByEmail(email);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const userWithoutPassword = withoutPassword(user);
    console.log('userWithoutPassword', userWithoutPassword);
    // const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

    const token = jwt.sign(userWithoutPassword, secret);

    res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'System Error' });
  }
};