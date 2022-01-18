import User from '../Models/user.model.js';
import * as controller from './user.controller.js';
import Cart from '../Models/cart.model.js';

jest.mock('../Models/user.model');
jest.mock('../Models/cart.model')

describe('Given the users controller', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { params: {} };
    res = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn();
  });

  describe('When we try to add a user(triggered)', () => {
    describe('And user is trying to add', () => {
      beforeEach(() => {
        User.create.mockResolvedValue({
          _id: '23',
          save: jest.fn()
        });
        Cart.create.mockResolvedValue({
          _id: '21'
        })
      });

      test('User model exist and have a method create', () => {
        expect(User.create).toBeTruthy()
      });

      describe('And user and password is present', () => {
        beforeEach(() => {
          req.body = {
            name: 'David',
            password: '1234',
            email: 'david@isdi.com',
            favorites: [],
            cart: ''
          };
        });

        test('Then call json', async () => {
          await controller.addUser(req, res, next);
          expect(next).not.toHaveBeenCalled();
          expect(res.json).toHaveBeenCalled();
        })
      });

      describe('And only user', () => {
        beforeEach(() => {
          req.body = {
            password: '1234',
            email: 'david@isdi.com',
            favorites: [],
            cart: ''
          };
        });

        test('Then call next', async () => {
          await controller.addUser(req, res, next);
          expect(next).toHaveBeenCalled();
        });
      });

      describe('When add user failed', () => {
        beforeEach(() => {
          User.create.mockResolvedValue({});

          req.body = {
            name: 'David',
            password: '1234',
            email: 'david@isdi.com',
            favorites: [],
            cart: ''
          };
        });

        test('Then call res status', async () => {
          await controller.addUser(req, res, next);
          expect(next).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalled();
        })
      });
    });
  });

  describe('When getAllUsers is triggered', () => {
    describe('And it works (promise is resolved)', () => {
      beforeEach(() => {
        User.find.mockReturnValue([]);
      });
      test('User model exist and have a method "find"', () => {
        expect(User.find).toBeTruthy();
      });
      test('Then call json', async () => {
        await controller.getAllUsers(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And it does not work', () => {
      beforeEach(() => {
        User.find.mockReturnValue(Promise.reject("error"));
      });
      test('User model exists and have a method "find"', () => {
        expect(User.find).toBeTruthy();
      });
      test("Then call next", async () => {
        await controller.getAllUsers(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
      });
    })
  });

  describe('When  getUserById is triggered', () => {
    describe('And the id is found (promise resolved)', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        User.findById.mockReturnValue({});
      });
      test('Then call json', async () => {
        await controller.getUserById(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And the id is not found (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        User.findById.mockReturnValue({});
      });
      test('Then call next and status', async () => {
        await controller.getUserById(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
    describe('And the id is not found (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        User.findById.mockRejectedValue({});
      });
      test('Then call next and status', async () => {
        await controller.getUserById(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });
});

