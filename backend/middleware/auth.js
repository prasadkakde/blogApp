import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ','') || req.body.token || req.query.token;
  if (!token) return res.status(401).json({ success: false, msg: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'somesecret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: 'Invalid token' });
  }
}

