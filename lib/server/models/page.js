import mongoose from 'mongoose';
import tabsStore from '../stores/tabs';

var pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  state: {
    type: String,
    default: 'draft'
  },
  date: {
    type: Date,
    default: Date.now
  },
  data: {
    type: Array
  },
  actions: {
    type: Array,
    default: []
  }
});

pageSchema.post('remove', (page) => {
  tabsStore.removeMultiple({
    pageId: page._id
  });
});

export default mongoose.model('Page', pageSchema);
