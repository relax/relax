import {Model} from 'relax-framework';

export default Model.extend({
  idAttribute: "id",
  parse: function(response) {
    response.id = response._id._id + response._id._userId;
    return response;
  },
  url: function () {
    const _id = this.get('_id');
    return '/api/tab/'+_id._id+'/'+_id._userId;
  }
});
