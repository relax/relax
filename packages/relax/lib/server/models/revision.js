import mongoose from 'mongoose';

const revisionSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  version: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  doc: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {minimize: false});

revisionSchema.index(
  {
    itemId: 1,
    version: 1
  },
  {unique: true}
);

export default mongoose.model('Revision', revisionSchema);
