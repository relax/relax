import {Actions} from 'relax-framework';

class FontsActions extends Actions {
  init () {

  }

  getActions () {
    return [
      'submit',
      'remove'
    ];
  }
}

export default new FontsActions();
