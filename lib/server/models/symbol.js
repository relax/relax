import mongoose from 'mongoose';

const symbolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

export default mongoose.model('Symbol', symbolSchema);
