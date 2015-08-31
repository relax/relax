import {ServerStore} from 'relax-framework';
import MediaModel from '../models/media';

class MediaStore extends ServerStore {
  constructor () {
    super();
    this.Model = MediaModel;
  }
}

export default new MediaStore();
