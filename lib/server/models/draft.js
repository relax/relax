import mongoose from 'mongoose';

var draftSchema = new mongoose.Schema({
  _id: {
    _id: {
      type: mongoose.Schema.Types.ObjectId
    },
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
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
