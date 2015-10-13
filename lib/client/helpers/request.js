import request from 'superagent';
import Q from 'q';

export default function doRequest (body) {
  const {dispatch: callback, query, variables, type} = body;

  return new Q()
    .then(() => {
      const deferred = Q.defer();
      var promise = deferred.promise;

      request
        .post('/graphql')
        .set('Content-Type', 'application/graphql')
        .type('json')
        .send({query, variables})
        .end((error, res) => {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve(res.body);
          }
        });

      if (callback) {
        promise = promise.then(({data, errors}) => {
          callback({type, data, errors});
        });
      }

      return promise;
    });
}
