import {Model} from 'relax-framework';

export default Model.extend({
  idAttribute: "_id",
  url: function () {
    if (this.id) {
      return '/api/schema/'+this.id;
    } else {
      return '/api/schema';
    }
  }
});
