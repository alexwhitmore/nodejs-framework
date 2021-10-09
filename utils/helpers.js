const queryParse = (url) => {
  const results = url.match(/\?(?<query>.*)/);

  if (!results) {
    return {};
  }

  const {
    groups: { query },
  } = results;

  const pairs = query.match(/(?<param>\w+)=(?<value>\w+)/g);

  const params = pairs.reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
  }, {});
  return params;
};

const createResponse = (res) => {
  res.send = (message) => res.end(message);
  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };
  return res;
};

const registerPath = (routeTable, path, cb, method, middleware) => {
  if (!routeTable[path]) {
    routeTable[path] = {};
  }
  routeTable[path] = {
    ...routeTable[path],
    [method]: cb,
    [method + '-middleware']: middleware,
  };
};

const urlParse = (url) => {
  let str = '';

  for (var i = 0; i < url.length; i++) {
    const c = url.charAt(i);
    if (c === ':') {
      // eat all characters
      let param = '';
      for (var j = i + 1; j < url.length; j++) {
        if (/\w/.test(url.charAt(j))) {
          param += url.charAt(j);
        } else {
          break;
        }
      }
      str += `(?<${param}>\\w+)`;
      i = j - 1;
    } else {
      str += c;
    }
  }
  return str;
};

module.exports = {
  queryParse,
  createResponse,
  registerPath,
  urlParse,
};
