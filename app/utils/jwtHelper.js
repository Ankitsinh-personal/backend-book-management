import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = async (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.ACCESS_SECRET_KEY, {
      expiresIn: process.env.ACCESS_EXPIRATION_TIME,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const verifyAccessToken = async (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_SECRET_KEY);
  } catch (error) {
    return null;
  }
};


export const tokenMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return next(new Error('Unauthorized'));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next(new Error('Unauthorized: Token not found'));
    }
    const tokenClaim = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    if (!tokenClaim) {
      return next(new Error('Unauthorized'));
    }
    req.userId = tokenClaim.userId;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new Error('Unauthorized: Invalid token'));
    } else {
      return next(error);
    }
  }
};