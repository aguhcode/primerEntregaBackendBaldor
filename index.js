const express = require('express');
const bodyParser = require('body-parser');
const productosRoutes = require('./routes/productos');
const carritosRoutes = require('./routes/carritos');

const app = express();
app.use(bodyParser.json());

app.use('/api/products', productosRoutes);
app.use('/api/carts', carritosRoutes);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});