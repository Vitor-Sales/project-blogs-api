const jwt = require('jsonwebtoken');

const { UserService } = require('../../services');

const secret = process.env.JWT_SECRET;

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

module.exports = async (req, res, next) => {
  const bearerToken = req.header('Authorization');
  
  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, secret);

    // id ou userId
    const user = await UserService.getByUserId(decoded.data.userId);

    if (!user) {
      return res.status(401).json({ message: 'invalid token 1' });
    }

    req.user = user;

    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ message: 'invalid token 2' });
  }
};