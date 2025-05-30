const express=require('express');
const router=express.Router()
const {validateListing,validateEditListing} = require('../middleware')
const Listing = require('../model/Listings')
const {isAuthenticated,isProvider,isOwnerOfListing}=require('../middleware')
const multer = require('multer');
const { storage } = require('../cloudConfig');

const upload = multer({ storage });

router.get('/', async (req, res) => {
  const listings = await Listing.find({});
  console.log(listings)
  res.json(listings);
})

router.post('/', isAuthenticated, isProvider, upload.single('logo'), validateListing, async (req, res) => {
  const { title, description, company, location, salary, type, experience, skills } = req.body;
  const logo = req.file ? req.file.path : null;

  const listing = new Listing({
    userId: req.user._id,
    title,
    description,
    company,
    location,
    salary,
    logo,
    type,
    experience,
    skills
  });

  try {
    const resp = await listing.save();
    res.status(201).json(resp);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const term = req.query.term;
    if (!term) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const listings = await Listing.find({
      title: { $regex: term, $options: 'i' }  // Case-insensitive search
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.get('/skills/:skill', async (req, res) => {
  const skill = req.params.skill;

  try {
    const jobs = await Listing.find({ skills: skill }); // Adjust field name as needed
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs by skill:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let job = await Listing.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.json(job);
  } catch (err) {
    return res.status(500).json({ message: "internal server error", err });
  }
})

router.put(
  '/:id',
  isAuthenticated,
  isProvider,
  isOwnerOfListing,
  upload.single('logo'), 
  validateEditListing,
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    if (typeof data.skills === 'string') {
      data.skills = data.skills.split(',').map((s) => s.trim());
    }
    if (req.file) {
      data.logo = req.file.path;
    }
    try {
      const updatedListing = await Listing.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!updatedListing) {
        return res.status(404).json({ message: 'Job listing not found' });
      }
      res.status(200).json(updatedListing);
    } catch (err) {
      console.error('Error updating listing:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.delete('/:id',isAuthenticated,isProvider,isOwnerOfListing,async(req,res)=>{
  const {id}=req.params;
  try{
    const resp=await Listing.findByIdAndDelete(id);
    res.status(200).json(resp);
  }catch(err){
    console.error("Error updating listing:",err);
    res.status(500).json({ message: "server error"})
  }
})

module.exports = router;