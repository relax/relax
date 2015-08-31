import {Actions} from 'relax-framework';

class SettingsActions extends Actions {
   init () {

   }

   getActions () {
     return [
       'saveSettings'
     ];
   }
}

export default new SettingsActions();
