import request from 'superagent';
import Q from 'q';

export default function doRequest (body) {
  const {dispatch: callback, query, variables, type, params} = body;

  return new Q()
    .then(() => {
      const deferred = Q.defer();
      let promise = deferred.promise;

      const req = request
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({query, variables});

      req
        .end((error, res) => {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve(res.body);
          }
        });

      if (callback) {
        promise = promise.then(({data, errors}) => {
          callback({type, data, errors, params});
          return data;
        });
      }

      return promise;
    });
}
