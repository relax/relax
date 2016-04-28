import mongoose from 'mongoose';

const tabSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  type: {
    type: String
  },
  item: {
    type: mongoose.Schema.Types.ObjectId
  }
});

export default mongoose.model('Tab', tabSchema);
