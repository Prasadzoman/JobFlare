// validateListing.js
const Joi = require('joi');
const Listing=require('./model/Listings')

const listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  company: Joi.string().required(),
  location: Joi.string().required(),
  salary: Joi.string().required(),
  logo: Joi.string().required(),
  type: Joi.string().required(),
  experience: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).required()
});

const editListingSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  company: Joi.string(),
  location: Joi.string(),
  salary: Joi.string(),
  logo: Joi.string(),
  type: Joi.string(),
  experience: Joi.string(),
  skills: Joi.array().items(Joi.string())
}).min(1);

const validateListing = (req, res, next) => {
  if (req.file && req.file.path) {
    req.body.logo = req.file.path;
  }

  if (typeof req.body.skills === 'string') {
    req.body.skills = [req.body.skills];
  }

  const { error } = listingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};


const validateEditListing = (req, res, next) => {

  if (typeof req.body.skills === 'string') {
    req.body.skills = req.body.skills.split(',').map(skill => skill.trim());
  }

  const { error } = editListingSchema.validate(req.body, { allowUnknown: true });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


const isAuthenticated=(req, res, next)=> {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized: Please login first' });
}

const isApplicant=(req,res,next)=>{
    if (req.isAuthenticated() && req.user.role==="applicant") {
      return next();
  }
  res.status(401).json({ message: 'Unauthorized: Your are not Applicant' });
}

const isProvider = (req, res, next) => {
  console.log(req.user)
  if (req.isAuthenticated() && req.user.role==="recruiter") {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized: You are not a Provider' });
};

const isOwnerOfListing = async (req, res, next) => {
  console.log(req.body)
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    if (listing.userId.toString() === req.user._id.toString()) {
      return next(); 
    }

    return res.status(401).json({ message: 'Unauthorized: Not your listing' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error in authorization' });
  }
};

module.exports = {validateListing,validateEditListing,isAuthenticated,isApplicant,isProvider,isOwnerOfListing};
