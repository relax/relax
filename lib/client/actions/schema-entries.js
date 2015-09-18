import {Actions} from 'relax-framework';

class SchemaEntriesActions extends Actions {
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

var schemaEntriesActionsCache = {};
export default (slug) => {
  if (schemaEntriesActionsCache[slug]) {
    return schemaEntriesActionsCache[slug];
  } else {
    var actions = new SchemaEntriesActions();
    schemaEntriesActionsCache[slug] = actions;
    return actions;
  }
};
