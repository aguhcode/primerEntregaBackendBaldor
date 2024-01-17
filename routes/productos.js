const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const productsFilePath = path.join(__dirname, '../data/productos.json');

router.get('/', (req, res) => {
  const { limit } = req.query;
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

  if (limit) {
    res.json(products.slice(0, parseInt(limit)));
  } else {
    res.json(products);
  }
});

router.get('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const productId = req.params.pid;
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.post('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const newProduct = req.body;

  if (!newProduct.id) {
    newProduct.id = uuidv4();
  }

  products.push(newProduct);
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

  res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const productId = req.params.pid;
  const updatedProduct = req.body;
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    updatedProduct.id = productId;
    products[productIndex] = updatedProduct;
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.delete('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const productId = req.params.pid;
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;