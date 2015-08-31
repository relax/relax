import {Actions} from 'relax-framework';

class ElementsActions extends Actions {
  init () {

  }

  getActions () {
    return [
      'getElements'
    ];
  }
}

export default new ElementsActions();
