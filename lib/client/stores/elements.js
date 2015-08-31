import {ClientStore} from 'relax-framework';
import Q from 'q';
import elements from '../../components/elements';

class ElementsStore extends ClientStore {

  findAll () {
    return Q()
      .then(() => {
        return elements;
      });
  }

}

export default new ElementsStore();
