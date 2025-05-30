const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Application=require('./Application')
const listingSchema = new Schema({
  userId:{type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
  logo: { type: String, required: true },
  type: { type: String, required: true },
  experience: { type: String, required: true },
  skills: { type: [String], required: true },
});

listingSchema.pre('findOneAndDelete', async function (next) {
  try {
    const listingBeingDeleted = await this.model.findOne(this.getQuery());
    if (listingBeingDeleted) {
      await Application.deleteMany({ jobId: listingBeingDeleted._id });
    }
    next(); 
  } catch (error) {
    next(error); 
  }
});

const Listing=mongoose.model('Listing', listingSchema);
module.exports = Listing;