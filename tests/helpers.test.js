const { queryParse } = require('../utils/helpers');

describe('Helper Function: queryParams()', () => {
  test('Return an empty object if there is no query parameter', () => {
    expect(queryParse('/users/alex')).toEqual({});
  });

  test('Should parse a signal query parameter', () => {
    expect(queryParse('/users?job=engineer')).toEqual({
      job: 'engineer',
    });
  });

  test('Should parse more than one query parameter', () => {
    expect(queryParse('/users?job=engineer&name=alex')).toEqual({
      job: 'engineer',
      name: 'alex',
    });
  });
});
