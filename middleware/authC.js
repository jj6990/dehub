const jwt = require('jsonwebtoken');
const config = require('config');

const authComp = (req, res, next) => {
  //get token header
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, autorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.comp = decoded.payload.comp;

    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
module.exports = authComp;
