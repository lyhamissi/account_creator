const mongoose = require('mongoose');

const AccountRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  accountType: { type: String, enum: ['personal', 'business'], required: true },
  useOwnInfo: { type: Boolean, required: true }, 
  userInfo: { 
    idNumber: String,
    ssn: String,
    name: String,
    address: String,
    email: String
  },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('AccountRequest', AccountRequestSchema);
