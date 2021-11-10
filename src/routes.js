const app = require('./app');
const users = require('../data/data');

const Restful = app();

Restful.get('/users', (req, res) => {
  res.json(users);
});

Restful.listen(3000, () => {
  console.log('Server running on 3000');
});
