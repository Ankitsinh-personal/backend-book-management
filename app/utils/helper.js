import bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const createHash = async (password) => {
  const hashPassword = await bcrypt.hash(password.toString(), saltOrRounds);
  return hashPassword;
};

export const match = async (hashPassword, password) => {
  const isMatch = await bcrypt.compare(password.toString(), hashPassword.toString());
  return isMatch;
};
