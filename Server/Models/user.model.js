import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Beer' }],
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
});
export default mongoose.model('User', userSchema);
