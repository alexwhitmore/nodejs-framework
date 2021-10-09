const app = require('./app');
const users = require('../data/data');

const Restful = app();

Restful.get('/users', (req, res) => {
  console.log('query params', req.query);
  res.json(users);
});

Restful.get('/users/:id', (req, res) => {
  console.log('query params', req.query);
  console.log('req.params', req.params);
  res.send('user name');
});

Restful.post('/users', (req, res) => {
  console.info('body', req.body);
  res.json(req.body);
});

Restful.listen(3000, () => {
  console.log('Server running on 3000');
});
