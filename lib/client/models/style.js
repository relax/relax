import {Model} from 'relax-framework';

export default Model.extend({
  idAttribute: "_id",
  url: function () {
    if (this.id) {
      return '/api/style/'+this.id;
    } else {
      return '/api/style';
    }
  }
});
