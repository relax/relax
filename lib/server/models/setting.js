import mongoose from 'mongoose';

var settingSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

export default mongoose.model('Setting', settingSchema);
