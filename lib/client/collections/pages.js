import {Collection} from 'relax-framework';
import PageModel from '../models/page';
import Utils from '../../utils';

export default Collection.extend({
   model: PageModel,
   url: function () {
     var url = '/api/page';

     if (this.options) {
       url = Utils.parseQueryUrl(url, this.options);
     }

     return url;
   }
});
