import mongoose, { Model } from 'mongoose';
import { Schema } from 'mongoose';

interface User {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<User>({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model('User', UserSchema);

// module.exports = UserModel;
export default UserModel;
