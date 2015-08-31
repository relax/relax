import {Actions} from 'relax-framework';

class MediaActions extends Actions {
   init () {

   }

   getActions () {
     return [
       'add',
       'remove',
       'removeBulk',
       'find',
       'resize'
     ];
   }
}

export default new MediaActions();
