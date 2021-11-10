const http = require('http');
const {
  urlParse,
  queryParse,
  createResponse,
  registerPath,
  readBody,
} = require('../utils/helpers');

let server;

function app() {
  let routeTable = {};
  let parseMethod = 'json';

  server = http.createServer(async (req, res) => {
    const routes = Object.keys(routeTable); // --> ['/users']

    let match = false;

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const parsedRoute = urlParse(route); // Comes from routes.js get request

      if (
        new RegExp(parsedRoute).test(req.url) &&
        routeTable[route][req.method.toLowerCase()]
      ) {
        let cb = routeTable[route][req.method.toLowerCase()];

        const m = req.url.match(new RegExp(parsedRoute));

        req.query = queryParse(req.url);

        let body = await readBody(req);

        if (parseMethod === 'json') {
          body = body ? JSON.parse(body) : {};
        }
        req.body = body;

        const result = createResponse(res);

        if (result) {
          cb(req, res);
        }

        match = true;
        break;
      }
    }
    if (!match) {
      res.statusCode = 404;
      res.end('Not found');
    }
  });

  return {
    get: (path, ...rest) => {
      if (rest.length === 1) {
        registerPath(routeTable, path, rest[0], 'get');
      } else {
        registerPath(routeTable, path, rest[1], 'get', rest[0]);
      }
    },
    bodyParse: (method) => (parseMethod = method),
    listen: (port, cb) => {
      server.listen(port, cb);
    },
    _server: server,
  };
}

module.exports = app;
