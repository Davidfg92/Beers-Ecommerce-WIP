import { checkPassword, createJWT } from '../Helpers/auth.helpers.js';
import User from '../Models/user.model.js';



async function logUser(req, res) {
  const { email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email: email });
  } catch (err) {}
  if (user && (await checkPassword(password, user))) {
    const jwToken = createJWT(user);
    res.json({
      user: user,
      token: jwToken,
    });
    return jwToken;
  } else {
    res.status(401).json({ message: 'Invalid user or password' });

    return;
  }
}

export { logUser }

