import $ from 'jquery';
import Q from 'q';

class SessionStore {
  getSession () {
    return Q()
    .then(() => {
      var deferred = Q.defer();

      $
        .get('/api/session')
        .done((response) => {
          if (response) {
            deferred.resolve(response);
          } else {
            deferred.reject();
          }
        })
        .fail((error) => {
          deferred.reject(error);
        });

      return deferred.promise;
    });
  }
}

export default new SessionStore();
