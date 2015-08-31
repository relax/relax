import {Collection} from 'relax-framework';
import ColorModel from '../models/color';

export default Collection.extend({
   model: ColorModel,
   url: '/api/color'
});
