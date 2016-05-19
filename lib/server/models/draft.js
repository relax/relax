import mongoose from 'mongoose';

const draftSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  __v: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
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

draftSchema.index(
  {
    itemId: 1,
    userId: 1
  },
  {unique: true}
);
draftSchema.set('versionKey', false);

export default mongoose.model('Draft', draftSchema);
