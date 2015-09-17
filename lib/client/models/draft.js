import {Model} from 'relax-framework';

export default Model.extend({
  idAttribute: "id",
  parse: function(response) {
    response.id = response._id._pageId + response._id._userId;

    return response;
  },
  url: function () {
    const _id = this.get('_id');
    return '/api/draft/'+_id._pageId+'/'+_id._userId;
  }
});
