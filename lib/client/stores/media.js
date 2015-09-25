import {ClientStore} from 'relax-framework';
import MediaCollection from '../collections/media';
import mediaActions from '../actions/media';
import forEach from 'lodash.foreach';
import Q from 'q';
import $ from 'jquery';

class MediaStore extends ClientStore {
  constructor () {
    super();
  }

  init () {
    if (this.isClient()) {
      this.listenTo(mediaActions, 'add', this.add);
      this.listenTo(mediaActions, 'remove', this.remove);
      this.listenTo(mediaActions, 'removeBulk', this.removeBulk);
      this.listenTo(mediaActions, 'find', this.findById);
      this.listenTo(mediaActions, 'resize', this.resize);
    }
  }

  count (_deferred) {
    var deferred = _deferred || Q.defer();

    $
      .get('/api/media/count')
      .done((response) => {
        deferred.resolve(response.count);
      })
      .fail((error) => {
        deferred.reject(error);
      });

    return deferred.promise;
  }

  createCollection () {
    return new MediaCollection();
  }

  removeBulk (ids) {
    var promises = [];

    forEach(ids, (id) => {
      promises.push(this.remove(id));
    });

    return Q.all(promises);
  }

  resize (data) {
    return Q()
      .then(() => {
        var deferred = Q.defer();

        $
          .get('/api/media/resize', data)
          .done((response) => {
            this.getModel(data.id).set(response);
            this.trigger('update', this.collection.toJSON());
            deferred.resolve(response);
          })
          .fail((error) => {
            deferred.reject(error);
          });

        return deferred.promise;
      });
  }
}

export default new MediaStore();
