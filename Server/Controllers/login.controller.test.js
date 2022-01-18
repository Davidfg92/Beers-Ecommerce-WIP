import * as controller from './login.controller.js';
import * as auth from '../Helpers/auth.helpers.js';
import User from '../Models/user.model.js';

jest.mock('../Models/user.model');
jest.mock('../Helpers/auth.helpers');

describe('Given the Login controller', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { params: {} };
    res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn();
  });

  describe('When a user try to log (logUser is triggered)', () => {
    describe('And user and password are valid (promise is resolved)', () => {
      beforeEach(() => {
        User.findOne.mockResolvedValue({});
        auth.checkPassword = jest.fn().mockResolvedValue(true);
        auth.createJWT = jest.fn().mockImplementation(() => 'token');
        req.body = {};
      });

      test('Then user model exists and have a method "findOne"', () => {
        expect(User.findOne).toBeTruthy();
      });

      test('Then user should be logged', async () => {
        await controller.logUser(req, res, next);
        expect(res.json).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled();
      });
    });
  });
  describe('And user and password are not valid', () => {
    beforeEach(() => {
      User.findOne.mockResolvedValue({});
      auth.checkPassword = jest.fn().mockResolvedValue(false);
      req.body = {};
    });

    test('Then user should not be logged', async () => {
      await controller.logUser(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
    })
  })
  describe('And user is not valid', () => {
    beforeEach(() => {
      User.findOne.mockResolvedValue({});
      auth.checkPassword = jest.fn().mockResolvedValue(false);
      req.body = {};
    })
    test('Then user should not be logged', async () => {
      await controller.logUser(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
    })
  })
});
