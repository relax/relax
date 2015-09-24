import {Model} from 'relax-framework';

export default Model.extend({
  idAttribute: "id",
  parse: function(response) {
    response.id = response._id._id + response._id.__v;

    return response;
  },
  url: function () {
    return '/api/revision/'+this.id;
  }
});
