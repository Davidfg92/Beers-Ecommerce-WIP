import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


async function checkPassword(passwd, user) {
  if (!user.password) {
    return false;
  }
  return await bcrypt.compare(passwd, user.password);
}

function createJWT(user) {
  const tokenPayload = {
    name: user.name,
    cart: user.cart,
    id: user._id,
  };

  const secret = process.env.SECRET;
  return jwt.sign(tokenPayload, secret);
}

export { checkPassword, createJWT };
