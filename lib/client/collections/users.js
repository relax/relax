import {Collection} from 'relax-framework';
import UserModel from '../models/user';

export default Collection.extend({
   model: UserModel,
   url: '/api/user'
});
