import {ServerStore} from 'relax-framework';
import TabModel from '../models/tab';
import Q from 'q';

class TabsStore extends ServerStore {
  constructor () {
    super();
    this.Model = TabModel;
  }

  add (data) {
    var model = new this.Model(data);

    return Q
      .ninvoke(model, 'save')
      .then(() => {
        return Q.ninvoke(
          this.Model,
          'populate',
          model,
          {
            path: 'pageId',
            select: 'title slug'
          }
        );
      })
      .then((entry) => {
        return entry.toJSON();
      });
  }

  removeMultiple (query) {
    this.Model.find(query).remove().exec();
  }
}

export default new TabsStore();
