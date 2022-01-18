import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import * as controller from './beer.controller.js';
import Beer from '../Models/beer.model.js';

jest.mock('../Models/beer.model');
jest.mock('jsonwebtoken');

describe('Given the beers controller', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn();
  });

  describe('When getAllBeers is triggered', () => {
    describe('And it works (promise is resolved)', () => {
      beforeEach(() => {
        Beer.find.mockReturnValue([]);
      });
      test('Beer model exist and have a method "find"', () => {
        expect(Beer.find).toBeTruthy();
      });
      test('Then call json', async () => {
        await controller.getAllBeers(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And it does not work', () => {
      beforeEach(() => {
        Beer.find.mockReturnValue(Promise.reject('error'));
      });
      test('User model exists and have a method "find"', () => {
        expect(Beer.find).toBeTruthy();
      });
      test('Then call next', async () => {
        await controller.getAllBeers(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When getAllBeers is triggered', () => {
    describe('And it works (promise is resolved)', () => {
      beforeEach(() => {
        Beer.findById.mockReturnValue([]);
      });
      test('Beer model exist and have a method "find"', () => {
        expect(Beer.findById).toBeTruthy();
      });
      test('Then call json', async () => {
        await controller.getBeerById(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And it does not work', () => {
      beforeEach(() => {
        Beer.findById.mockReturnValue(Promise.reject('error'));
      });
      test('User model exists and have a method "find"', () => {
        expect(Beer.findById).toBeTruthy();
      });
      test('Then call next', async () => {
        await controller.getBeerById(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });
});
