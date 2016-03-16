import mongoose from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import {Strategy} from 'passport-local';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model('User', userSchema);

passport.use(new Strategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

export default UserModel;
