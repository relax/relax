import {ClientStore} from 'relax-framework';
import Q from 'q';
import fontsActions from '../actions/fonts';
import $ from 'jquery';

class FontsStore extends ClientStore {

  constructor () {
    super();
  }

  init () {
    if (this.isClient()) {
      this.listenTo(fontsActions, 'submit', this.onSubmit);
      this.listenTo(fontsActions, 'remove', this.onRemove);
    }
  }

  onSubmit (files, deferred) {
    this.runPromises(deferred, [
      this.submit(files)
    ]);
  }

  onRemove (id, deferred) {
    this.runPromises(deferred, [
      this.remove(id)
    ]);
  }

  submit (files) {
    return () => {
      return Q()
        .then(() => {
          var deferred = Q.defer();

          $
            .post('/api/fonts/submit', {data: JSON.stringify(files)})
            .done((response) => {
              deferred.resolve(response);
            })
            .fail((error) => {
              deferred.error(error);
            });

          return deferred.promise;
        });
    };
  }

  remove (id) {
    return () => {
      return Q()
        .then(() => {
          var deferred = Q.defer();

          $
            .post('/api/fonts/remove', {id})
            .done((response) => {
              deferred.resolve(response);
            })
            .fail((error) => {
              deferred.error(error);
            });

          return deferred.promise;
        });
    };
  }

}

export default new FontsStore();
