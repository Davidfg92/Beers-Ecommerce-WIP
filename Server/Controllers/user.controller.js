import bcrypt from 'bcryptjs';
import User from '../Models/user.model.js';
import Cart from '../Models/cart.model.js';
import { logUser } from './login.controller.js';

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500);
    next(err);
  }
}

async function addUser(req, res, next) {

  const user = req.body;
  if (!user?.name || !user?.password) {
    next(new Error());
    return;
  }
  const initialPassword = user.password;





  try {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    const newUser = await User.create(user);
    const newCart = {
      beers: [],
      user: newUser._id,
    };

    const userCart = await Cart.create(newCart);

    newUser.cart = userCart._id;
    await newUser.save();

    req.body = {name: user.name, password: initialPassword}

    logUser(req, res)
  } catch (err) {
    res.status(401).json(err);
    next();
  }
}

async function getUserById(req, res, next) {
  if (!req.params.id) {
    next(new Error('Invalid id'));
    return;
  }

  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500);
    next(err);
  }
}

export { addUser, getAllUsers, getUserById };
