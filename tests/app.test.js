const server = require('../app')();
const supertest = require('supertest');
const request = supertest(server._server);
const { createResponse } = require('../utils/helpers');

describe('GET Request HTTP Methods', () => {
  const user = [
    {
      firstName: 'Alex',
      lastName: 'Whitmore',
    },
  ];

  beforeAll(() => {
    server.get('/users', (req, res) => {
      res.json(user);
    });
  });

  test('GET /users should return all users', async () => {
    const res = await request.get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(user);
    expect(res.headers['content-type']).toEqual('application/json');
  });

  afterAll(async () => {
    server._server.close();
  });
});
