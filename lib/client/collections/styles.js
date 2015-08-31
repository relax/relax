import {Collection} from 'relax-framework';
import StyleModel from '../models/style';
import Utils from '../../utils';

export default Collection.extend({
   model: StyleModel,
   url: function () {
     var url = '/api/style';

     if (this.options) {
       url = Utils.parseQueryUrl(url, this.options);
     }

     return url;
   }
});
