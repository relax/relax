import {ServerStore} from 'relax-framework';
import StyleModel from '../models/style';

class StylesStore extends ServerStore {
  constructor () {
    super();
    this.Model = StyleModel;
  }
}

export default new StylesStore();
