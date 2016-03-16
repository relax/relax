import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

export default mongoose.model('Color', colorSchema);
