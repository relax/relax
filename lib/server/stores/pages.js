import {ServerStore} from 'relax-framework';
import PageModel from '../models/page';

class PagesStore extends ServerStore {
  constructor () {
    super();
    this.Model = PageModel;
  }

  add (data, options = {}) {
    options.populate = 'createdBy updatedBy';
    return super.add(data, options);
  }

  findAll (options = {}) {
    options.populate = 'createdBy updatedBy';
    return super.findAll(options);
  }

  findOne (query, options = {}) {
    options.populate = 'createdBy updatedBy';
    return super.findOne(query, options);
  }

  update (id, data, options = {}) {
    options.populate = 'createdBy updatedBy';
    return super.update(id, data, options);
  }

  findBySlug (slug, options = {}) {
    return this.findOne({slug}, options);
  }
}

export default new PagesStore();
