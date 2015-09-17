import {Actions} from 'relax-framework';

class DraftActions extends Actions {
   init () {

   }

   getActions () {
     return [
       'remove',
       'update',
       'updateModel'
     ];
   }
}

export default new DraftActions();
