# Vanilla Nodejs Framework

> The purpose of this framework is to create a Nodejs framework that can be used to build RESTful APIs with **zero** dependencies.

## Starting the Application

```
npm install && npm start
```

## Testing the Application

```javascript
/*
 * routes.js has starting HTTP methods && runs on port 3000
 */

const users = require('../data/data')

const users = [
  {
    firstName: 'First',
    lastName: 'Last'
  }
  ...
];

// Example of currently existing GET request
Restful.get('/users', (req, res) => {
  res.json(users);
});
```
