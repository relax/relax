import {ClientStore} from 'relax-framework';
import RevisionsCollection from '../collections/revisions';
import revisionActions from '../actions/revision';

class RevisionsStore extends ClientStore {
  constructor () {
    super();
  }

  init () {
    if (this.isClient()) {

    }
  }

  createCollection () {
    return new RevisionsCollection();
  }
}

export default new RevisionsStore();
