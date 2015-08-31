import {Model} from 'relax-framework';

export default Model.extend({
  idAttribute: "_id",
  url: function () {
    return '/api/media/'+this.id;
  }
});
