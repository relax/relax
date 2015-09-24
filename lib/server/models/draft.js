import mongoose from 'mongoose';

var draftSchema = new mongoose.Schema({
  _id: {
    _pageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page'
    },
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  data: {
    type: Array,
    default: []
  },
  actions: {
    type: Array,
    default: []
  },
  schemaLinks: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

export default mongoose.model('Draft', draftSchema);
