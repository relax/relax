import mongoose from 'mongoose';

const styleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  options: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  displayOptions: {
    type: mongoose.Schema.Types.Mixed
  }
});

export default mongoose.model('Style', styleSchema);
