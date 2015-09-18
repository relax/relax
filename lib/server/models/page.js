import mongoose from 'mongoose';
import tabsStore from '../stores/tabs';
import revisionsStore from '../stores/revisions';

var pageSchema = new mongoose.Schema({
  _version: {
    type: Number,
    required: true,
    default: 1
  },
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
  updatedDate: {
    type: Date,
    default: Date.now
  },
  data: {
    type: Array,
    default: []
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

pageSchema.post('remove', (page) => {
  tabsStore.removeMultiple({
    pageId: page._id
  });

  revisionsStore.removeMultiple({
    '_id._id': page._id
  });
});

export default mongoose.model('Page', pageSchema);
