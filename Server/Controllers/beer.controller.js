import Beer from '../Models/beer.model.js';

async function getAllBeers(req, res, next) {
  try {
    const beers = await Beer.find({});
    res.json(beers);
  } catch (err) {
    res.status(500);
    next(err);
  }
}

async function getBeerById(req, res, next) {
  try {
    const beer = await Beer.findById(req.params.id);
    res.json(beer);
  } catch (err) {
    res.status(500);
    next(err);
  }
}

export { getAllBeers, getBeerById };
