import {Actions} from 'relax-framework';

class ColorActions extends Actions {
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

export default new ColorActions();
