//! 6:01

const mongoose = require('mongoose');
const PlaceModel = require('./Place');

//! 6:28 Mongoose Populate
// https://mongoosejs.com/docs/populate.html

const BookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;
