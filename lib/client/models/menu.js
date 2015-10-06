import {Model} from 'relax-framework';

export default Model.extend({
  idAttribute: "_id",
  url: function () {
    let url = '/api/menu';
    if (this.id) {
      url += '/'+this.id;
    }
    return url;
  }
});
