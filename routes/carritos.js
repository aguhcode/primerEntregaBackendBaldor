const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const carritosFilePath = path.join(__dirname, '../data/carrito.json');

router.post('/', (req, res) => {
  const carritos = JSON.parse(fs.readFileSync(carritosFilePath, 'utf-8'));
  const newCart = {
    id: uuidv4(),
    products: [],
  };

  carritos.push(newCart);
  fs.writeFileSync(carritosFilePath, JSON.stringify(carritos, null, 2));

  res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
  const carritos = JSON.parse(fs.readFileSync(carritosFilePath, 'utf-8'));
  const cartId = req.params.cid;
  const cart = carritos.find((c) => c.id === cartId);

  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  const carritos = JSON.parse(fs.readFileSync(carritosFilePath, 'utf-8'));
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const cartIndex = carritos.findIndex((c) => c.id === cartId);
  const productIndex = -1;

  if (cartIndex !== -1) {
    const productToAdd = { product: productId, quantity: 1 };
    const cartProducts = carritos[cartIndex].products;

    const existingProduct = cartProducts.find((p) => p.product === productId);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cartProducts.push(productToAdd);
    }

    fs.writeFileSync(carritosFilePath, JSON.stringify(carritos, null, 2));

    res.json(productToAdd);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});

module.exports = router;