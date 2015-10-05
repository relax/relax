import {Collection} from 'relax-framework';
import MenuModel from '../models/menu';
import Utils from '../../utils';

export default Collection.extend({
   model: MenuModel,
   url: function () {
     var url = '/api/menu';

     if (this.options) {
       url = Utils.parseQueryUrl(url, this.options);
     }

     return url;
   }
});
