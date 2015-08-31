import mongoose from 'mongoose';

var styleSchema = new mongoose.Schema({
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
  }
});

export default mongoose.model('Style', styleSchema);
