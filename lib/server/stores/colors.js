import {ServerStore} from 'relax-framework';
import ColorModel from '../models/color';

class ColorsStore extends ServerStore {
  constructor () {
    super();
    this.Model = ColorModel;
  }
}

export default new ColorsStore();
