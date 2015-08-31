import {ClientStore} from 'relax-framework';
import StylesCollection from '../collections/styles';
import styleActions from '../actions/style';

class StylesStore extends ClientStore {
  constructor () {
    super();
  }

  init () {
    if (this.isClient()) {
      this.listenTo(styleActions, 'add', this.add);
      this.listenTo(styleActions, 'remove', this.remove);
      this.listenTo(styleActions, 'update', this.update);
    }
  }

  createCollection () {
    return new StylesCollection();
  }

}

export default new StylesStore();
