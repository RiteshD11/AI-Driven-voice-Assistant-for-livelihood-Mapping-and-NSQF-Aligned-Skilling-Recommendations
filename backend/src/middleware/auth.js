const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      // In demo mode or if bypass header present, allow mock user
      if (process.env.DEMO_MODE === 'true' || req.headers['x-demo-user'] === 'true') {
        req.user = {
          _id: '66e5f7a8b9c1d2e3f4a5b6c7',
          name: 'Demo Beneficiary',
          email: 'demo@aarohan.gov.in',
          role: 'beneficiary'
        };
        return next();
      }
      return res.status(401).json({ error: 'Not authorized to access this route' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'aarohan-sih-2026-secret-key-32char');
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ error: 'User not found' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Token expired or invalid' });
    }
  } catch (error) {
    next(error);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: `User role '${req.user ? req.user.role : 'guest'}' is not authorized` });
    }
    next();
  };
};

module.exports = { protect, authorize };
