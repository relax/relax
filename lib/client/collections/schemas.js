import {Collection} from 'relax-framework';
import SchemaModel from '../models/schema';
import Utils from '../../utils';

export default Collection.extend({
   model: SchemaModel,
   url: function () {
     var url = '/api/schema';

     if (this.options) {
       url = Utils.parseQueryUrl(url, this.options);
     }

     return url;
   }
});
