import mongoose from 'mongoose';

var colorSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

export default mongoose.model('Color', colorSchema);
