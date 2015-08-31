import {Model} from 'relax-framework';

export default Model.extend({
  idAttribute: "_id",
  url: function () {
    if (this.id) {
      return '/api/setting/'+this.id;
    } else {
      return '/api/setting';
    }
  }
});
