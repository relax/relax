import {Actions} from 'relax-framework';

class MenuActions extends Actions {
   init () {

   }

   getActions () {
     return [
       'add',
       'remove',
       'validateSlug',
       'update'
     ];
   }
}

export default new MenuActions();
