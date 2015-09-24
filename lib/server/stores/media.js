import {ServerStore} from 'relax-framework';
import MediaModel from '../models/media';

class MediaStore extends ServerStore {
  constructor () {
    super();
    this.Model = MediaModel;
  }

  getDefaultQueryOptions () {
    return {
      sort: {
        _id: -1
      }
    };
  }
}

export default new MediaStore();
