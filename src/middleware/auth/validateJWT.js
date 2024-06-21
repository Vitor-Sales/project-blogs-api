const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

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
    console.log({ decoded });
    // const user = await UserService.getByUserId(decoded.id);

    //  if (!user) {
    //    return res.status(401).json({ message: 'Expired or invalid token' });
    //  }

    req.user = decoded;
    console.log(`req.user: ${decoded}`);
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};