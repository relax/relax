import {Actions} from 'relax-framework';

class TabActions extends Actions {
   init () {}

   getActions () {
     return [
       'add',
       'remove'
     ];
   }
}

export default new TabActions();
