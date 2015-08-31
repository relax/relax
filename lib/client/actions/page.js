import {Actions} from 'relax-framework';

class PageActions extends Actions {
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

export default new PageActions();
