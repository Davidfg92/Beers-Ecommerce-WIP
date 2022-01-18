import Cart from '../Models/cart.model.js';
import Beer from '../Models/beer.model.js';
import jwt from 'jsonwebtoken';

async function getCartById(req, res) {
  const authorization = req.get('Authorization');
  let token = '';
  let decodeToken = '';

  try {
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
      decodeToken = jwt.verify(token, process.env.SECRET);

    }


    if (!token || !decodeToken?.id) {
      res.status(401).json({
        error: 'token missing or invalid',
      });
    } else {
      const cart = await Cart.findById(decodeToken.cart).populate({
        path: 'beers.beer',
        select: ['name', 'price', 'image'],
      });
      res.json(cart);
    }
  } catch (error) {
    res.status(401).json({
      error: 'token missing or invalid',
    });
  }
}

async function addToCart(req, res) {
  const authorization = req.body.headers.Authorization;

  let token = '';
  let decodeToken = null;

  try {
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
      decodeToken = jwt.verify(token, process.env.SECRET);
    }

    if (!token || !decodeToken?.id) {
      res.status(401).json({
        error: 'token missing or invalid',
      });
    } else {
      const { beerId } = req.body;
      const beer = await Beer.findById(beerId);
      const cart = await Cart.findById(decodeToken.cart);

      const existBeer = cart.beers.some(
        (elem) => JSON.stringify(elem.beer) === JSON.stringify(beer._id)
      );

      if (existBeer) {
        cart.beers.forEach((elem) => {
          if (JSON.stringify(elem.beer) === JSON.stringify(beer._id)) {
            elem.amount++;
          }
        });
      } else {
        cart.beers = [...cart.beers, { beer: beer._id, amount: 1 }];
      }

      cart.save();

      beer.stock -= 1;
      beer.save();

      res.json(cart);
    }
  } catch (error) {
    res.status(401).json({
      error: 'token missing or invalid',
    });

    return token;
  }
}

async function buyCart(req, res) {
  const authorization = req.body.headers.Authorization;
  console.log(req.body.headers.Authorization)
  let token = '';
  let decodeToken = null;

  try {
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
      decodeToken = jwt.verify(token, process.env.SECRET);
    }

    if (!token || !decodeToken?.id) {
      res.status(401).json({
        error: 'token missing or invalid',
      });
    } else {
      const cart = await Cart.findById(decodeToken.cart);

      cart.beers = [];

      cart.save();
      res.json(cart);
    }
  } catch (error) {
    res.status(401).json({
      error: 'token missing or invalid',
    });
    return token;
  }
}

async function deleteToCart(req, res) {
  const authorization = req.headers.authorization;

  let token = '';
  let decodeToken = null;

  try {
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
      decodeToken = jwt.verify(token, process.env.SECRET);
    }

    if (!token || !decodeToken?.id) {
      res.status(401).json({
        error: 'token missing or invalid',
      });
    } else {
      const { beerId } = req.body
      const cart = await Cart.findById(decodeToken.cart);
      const beer = await Beer.findById(beerId);

      cart.beers.forEach((elem) => {
        if (JSON.stringify(elem.beer) === JSON.stringify(beer._id)) {
          if (elem.amount === 1) {
            cart.beers = cart.beers.filter(
              (elem) => JSON.stringify(elem.beer) !== JSON.stringify(beer._id)
            );
          } else {
            elem.amount--;
          }
        }
      });

      await cart.save()


      beer.stock += 1;
      await beer.save();
      const finalCart = await Cart.findById(decodeToken.cart).populate({
        path: 'beers.beer',
        select: ['name', 'price', 'image'],
      });
      res.json(finalCart);
    }
  } catch (error) {
    res.status(401).json({
      error: 'token missing or invalid',
    });

    return;
  }
}

export { addToCart, buyCart, deleteToCart, getCartById };
