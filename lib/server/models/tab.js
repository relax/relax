import mongoose from 'mongoose';

var tabSchema = new mongoose.Schema({
  _id: {
    _id: {
      type: mongoose.Schema.Types.ObjectId
    },
    _userId: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page'
  },
  userSchema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schema'
  }
});

export default mongoose.model('Tab', tabSchema);
