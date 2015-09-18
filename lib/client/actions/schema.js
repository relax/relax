import {Actions} from 'relax-framework';

class SchemaActions extends Actions {
   init () {

   }

   getActions () {
     return [
       'add',
       'remove',
       'validateSlug',
       'update',
       'restore'
     ];
   }
}

export default new SchemaActions();
