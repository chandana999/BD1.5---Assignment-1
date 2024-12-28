const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice  = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send((newItemPrice + cartTotal).toString());
});


app.get('/membership-discount', (req, res) => {
  let cartTotal  = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";
  if(isMember){
    cartTotal = (cartTotal - (cartTotal * (discountPercentage / 100)));
  }else {
    cartTotal = cartTotal;
  }
  res.send(cartTotal.toString());
});


app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalTax = (cartTotal * (taxRate / 100));
  res.send(totalTax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod   = req.query.shippingMethod ;
  let distance = parseFloat(req.query.distance);
  if(shippingMethod === "Standard"){
    res.send((distance / 50).toString());
  }else if (shippingMethod === 'express'){
    res.send((distance / 100).toString());
  }
  else {
    return res.status(400).send('invalid input');
  }
  
});

app.get('/shipping-cost', (req, res) => {
  let weight  = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount   = parseFloat(req.query.purchaseAmount);
  let loyalPoints =  purchaseAmount * loyaltyRate;
  res.send( loyalPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
