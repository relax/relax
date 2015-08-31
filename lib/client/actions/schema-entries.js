import {Actions} from 'relax-framework';

class SchemaEntriesActions extends Actions {
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

var schemaEntriesActionsArr = {};
export default (slug) => {
  if(schemaEntriesActionsArr[slug]){
    return schemaEntriesActionsArr[slug];
  } else {
    var actions = new SchemaEntriesActions();
    schemaEntriesActionsArr[slug] = actions;
    return actions;
  }
};
