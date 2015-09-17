import {Actions} from 'relax-framework';

class DraftActions extends Actions {
   init () {

   }

   getActions () {
     return [
       'remove',
       'update'
     ];
   }
}

export default new DraftActions();
