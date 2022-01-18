import { checkPassword, createJWT } from './auth.helpers.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

test('should ... checkPasswd ', async () => {
  const password = '';
  const user = { password: '1234' };
  await checkPassword(password, user);
  expect(bcrypt.compare).toHaveBeenCalled();
});

test('should ... checkPasswd ', async () => {
  const password = '';
  const user = { password: '' };
  const result = await checkPassword(password, user);
  expect(result).toBe(false);
});

test('should ... createJWT ', () => {
  const user = { name: '', cart: '', id: '' };
  createJWT(user);
  expect(jwt.sign).toHaveBeenCalled();
});
