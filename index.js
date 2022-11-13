require('dotenv').config();
const express = require('express');
const getMenu = require('./functions/getMenu');
const getProducts = require('./functions/getProducts');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/site-menu', async(req, res) => {
  const response = await getMenu();
  res.json(response);
});

app.post('/products', async(req, res) => {
  const response = await getProducts(req.body.url);
  res.json(response);
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});