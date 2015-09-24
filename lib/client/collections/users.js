import {Collection} from 'relax-framework';
import UserModel from '../models/user';
import Utils from '../../utils';

export default Collection.extend({
   model: UserModel,
   url: function () {
     var url = '/api/user';

     if (this.options) {
       url = Utils.parseQueryUrl(url, this.options);
     }

     return url;
   }
});
