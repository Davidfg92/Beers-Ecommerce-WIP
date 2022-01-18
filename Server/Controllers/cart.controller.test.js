import * as controller from './cart.controller.js';
import Cart from '../Models/cart.model.js';
import jwt from 'jsonwebtoken';
import Beer from '../Models/beer.model.js';

jest.mock('../Models/cart.model');
jest.mock('../Models/beer.model');
jest.mock('jsonwebtoken');

describe('Given the Cart controller', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { params: {}, body: { beerId: '123', headers: { Authorization: 'Bearer 123'} }, headers: { authorization: 'Bearer 123' }};
    res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn();
  });

  describe('When the user try to access to cart', () => {
    describe('And the user have a token', () => {
      beforeEach(() => {
        req.get = jest.fn().mockReturnValue('Bearer Token');
        jwt.verify = jest.fn().mockReturnValue({ id: true });
        Cart.findById.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('Then call json', async () => {
        await controller.getCartById(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And the user do not have a token', () => {
      beforeEach(() => {
        req.get = jest.fn().mockRejectedValue(null);
        jwt.verify = jest.fn().mockReturnValue({ id: true });
      });

      test('Then user should not be logged', async () => {
        await controller.getCartById(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe('And the findById fail', () => {
      beforeEach(() => {
        req.get = jest.fn().mockReturnValue('Bearer Token');
        jwt.verify = jest.fn().mockReturnValue({ id: true });
        Cart.findById = jest.fn().mockRejectedValue({});
      });

      test('Then user should be logged', async () => {
        await controller.getCartById(req, res, next);
        expect(res.json).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
      });
    });

    describe('And the id fail', () => {
      beforeEach(() => {
        req.get = jest.fn().mockReturnValue('Bearer Token');
        jwt.verify = jest.fn().mockReturnValue({ id: false });
        Cart.findById = jest.fn().mockRejectedValue({});
      });

      test('Then user should be logged', async () => {
        await controller.getCartById(req, res, next);
        expect(res.json).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
      });
    });
  });

  describe('When the user try to add to cart', () => {
    describe('And the user dont have a token', () => {
      beforeEach(() => {
        req.body.headers.Authorization = jest.fn().mockReturnValue(null);
        jwt.verify = jest.fn().mockReturnValue({ id: true });
      });

      test('Then token fail', async () => {
        Beer.findById.mockReturnValue({
          beerId: '234',
          save: jest.fn(),
        });
        Cart.findById.mockReturnValue({
          beers: [
            {
              beer: '123',
              amount: 2,
            },
          ],
          save: jest.fn(),
        });
        await controller.addToCart(req, res);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('When the user try to add to cart', () => {
      describe('And the user dont have a token', () => {
        beforeEach(() => {
          req.body.headers.Authorization = jest.fn().mockReturnValue('Bearer Token');
          jwt.verify = jest.fn().mockReturnValue({ id: true });
        });

        test('Then different beer', async () => {
          Beer.findById.mockReturnValue({
            beerId: '234',
            save: jest.fn(),
          });
          Cart.findById.mockReturnValue({
            beers: [
              {
                beer: '123',
                amount: 2,
              },
            ],
            save: jest.fn(),
          });
          await controller.addToCart(req, res);
          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('And the user have a token', () => {
        beforeEach(() => {
          req.get = jest.fn().mockReturnValue('Bearer Token');
          jwt.verify = jest.fn().mockReturnValue({ id: true });
        });

        test('Dont have a beer', async () => {
          Beer.findById.mockReturnValue({
            save: jest.fn(),
          });
          Cart.findById.mockReturnValue({
            beers: [
              {
                beerId: '123',
                amount: 2,
              },
            ],
            save: jest.fn(),
          });
          await controller.addToCart(req, res);
          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('Then have not beer ID', () => {
        beforeEach(() => {
          req.get = jest.fn().mockReturnValue('Bearer Token');
          jwt.verify = jest.fn().mockReturnValue({ id: true });
        });

        test('Then have not beer ID', async () => {
          Beer.findById.mockReturnValue({});
          Cart.findById.mockReturnValue({
            beers: [
              {
                beerId: '123',
                amount: 2,
              },
            ],
            save: jest.fn(),
          });
          await controller.addToCart(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
        });
      });
    });

    describe('When the user try to buy cart', () => {
      describe('And the user have a token', () => {
        beforeEach(() => {
          req.get = jest.fn().mockReturnValue('Bearer Token');
          jwt.verify = jest.fn().mockReturnValue({ id: true });
        });

        test('Then user should be logged', async () => {
          await controller.buyCart(req, res);
          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('And the user dont have a token', () => {
        beforeEach(() => {
          req.get = jest.fn().mockReturnValue(null);
          jwt.verify = jest.fn().mockReturnValue({ id: true });
        });

        test('Then user should be logged', async () => {
          await controller.buyCart(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
        });
      });

      describe('And the user have a token', () => {
        beforeEach(() => {
          req.get = jest.fn().mockRejectedValue(null);
          jwt.verify = jest.fn().mockRejectedValue({ id: true });
        });

        test('Then user should be logged (promise rejected)', async () => {
          Cart.findById.mockRejectedValue({});
          await controller.buyCart(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
        });
      });
    });

    describe('When the user try to delete to cart', () => {
      describe('And the user have a token FAIL', () => {
        beforeEach(() => {
          req.get = jest.fn().mockReturnValue('Bearer Token');
          jwt.verify = jest.fn().mockReturnValue({ id: true });
        });

        test('Then user should be logged', async () => {
          Cart.findById({});
          await controller.deleteToCart(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
        });
      });

      describe('And the user dont have a token', () => {
        beforeEach(() => {
          req.get = jest.fn().mockReturnValue(null);
          jwt.verify = jest.fn().mockReturnValue({ id: true });
        });

        test('Then user should be logged', async () => {
          await controller.deleteToCart(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
        });
      });

      describe('And the cart have same beer', () => {
        beforeEach(() => {
          req.get = jest.fn().mockReturnValue('Bearer Token');
          jwt.verify = jest.fn().mockReturnValue({ id: true });
        });

        test('Then have beer', async () => {
          Beer.findById.mockReturnValue({
            beerId: '123',
            save: jest.fn(),
          });
          Cart.findById.mockReturnValue({
            beers: [
              {
                beerId: '123',
                amount: 2,
              },
              {
                beerId: '234',
                amount: 3,
              },
            ],
            save: jest.fn(),
          });
          await controller.deleteToCart(req, res);
          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('And the cart have same beer', () => {
        beforeEach(() => {
          req.get = jest.fn().mockReturnValue('Bearer Token');
          jwt.verify = jest.fn().mockReturnValue({ id: true });
        });

        test('Then have 1 beer', async () => {
          Beer.findById.mockReturnValue({
            beerId: '123',
            save: jest.fn(),
          });
          Cart.findById.mockReturnValue({
            beers: [
              {
                beerId: '123',
                amount: 1,
              },
              {
                beerId: '234',
                amount: 3,
              },
            ],
            save: jest.fn(),
          });
          await controller.deleteToCart(req, res);
          expect(res.json).toHaveBeenCalled();
        });
      });
    });
  });
});
