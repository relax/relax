import {Actions} from 'relax-framework';

class StyleActions extends Actions {
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

export default new StyleActions();
