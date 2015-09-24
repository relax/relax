import mongoose from 'mongoose';

var schema = new mongoose.Schema({
  _id: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    __v: {
      type: Number,
      required: true
    }
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
});

export default mongoose.model('Revision', schema);
