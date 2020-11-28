const users = require('./users');
const product = require('./product');

//Define all app route
const routes = (app) => {
  app.get("/", (req, res) => {
    res.send("Product Store API");
  });
  app.use('/api', users());
  app.use('/api/product', product());
};

module.exports = routes;
