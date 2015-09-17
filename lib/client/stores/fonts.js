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
      this.listenTo(fontsActions, 'submit', this.submit);
      this.listenTo(fontsActions, 'remove', this.remove);
    }
  }

  submit (files, deferred) {
    return Q()
      .then(() => {
        $
          .post('/api/fonts/submit', {data: JSON.stringify(files)})
          .done((response) => {
            deferred.resolve(response);
          })
          .fail((error) => {
            deferred.reject(error);
          });

        return deferred.promise;
      });
  }

  remove (id, deferred) {
    return Q()
      .then(() => {
        $
          .post('/api/fonts/remove', {id})
          .done((response) => {
            deferred.resolve(response);
          })
          .fail((error) => {
            deferred.reject(error);
          });

        return deferred.promise;
      });
  }

}

export default new FontsStore();
