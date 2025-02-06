import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js'; // Ensure you have this secret set

const authenticate = async (ctx, next) => {
  const token = ctx.headers.authorization || ctx.cookies.get('token'); 

  if (!token) {
    ctx.throw(401, 'Authentication token missing');
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach the user information to the request context
    ctx.state.user = decoded;
    await next();
  } catch (error) {
    ctx.throw(401, 'Invalid or expired token');
  }
};

export default authenticate;