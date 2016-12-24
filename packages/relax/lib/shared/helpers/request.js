import request from 'superagent';
import Promise from 'bluebird';

export default function doRequest (body) {
  const {dispatch: callback, query, variables, type, params} = body;

  return new Promise((resolve, reject) => {
    request
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({query, variables})
      .end((error, res) => {
        if (error) {
          reject(error);
        } else {
          resolve(res.body);
        }
      });
  })
  .then((result) => {
    const {data, errors} = result;
    if (callback) {
      callback({type, data, errors, params});
      return data;
    }
    return result;
  });
}
