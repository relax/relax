import mongoose from 'mongoose';

const migrationSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  when: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Migration', migrationSchema);
