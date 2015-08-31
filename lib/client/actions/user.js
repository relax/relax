import {Actions} from 'relax-framework';

class UserActions extends Actions {
   init () {

   }

   getActions () {
     return [
       'add',
       'remove',
       'update'
     ];
   }
}

export default new UserActions();
