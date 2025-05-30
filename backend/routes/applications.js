const express = require("express")
const router = express.Router()
const Application = require('../model/Application');
const { isAuthenticated, isApplicant, isProvider } = require('../middleware')
const multer = require('multer');
const { resumeStorage } = require('../cloudConfig')


const upload = multer({ storage: resumeStorage });

router.post(
  '/',
  isAuthenticated,
  isApplicant,
  upload.single('resume'),
  async (req, res) => {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    try {
      const {
        jobId,
        fullName,
        email,
        phone,
        coverLetter,
        linkedIn,
        expectedSalary,
        startDate,
        workAuthorization,
        relocate,
        experience,
        skills
      } = req.body;

      const resumeUrl = req.file ? req.file.path : null;

      let skillsArray = [];
      if (skills) {
        if (Array.isArray(skills)) {
          skillsArray = skills;
        } else if (typeof skills === 'string') {
          skillsArray = skills.split(',').map(s => s.trim());
        }
      }

      const application = new Application({
        jobId,
        userId: req.user._id,
        fullName,
        email,
        phone,
        coverLetter,
        linkedIn,
        resumeUrl,
        expectedSalary,
        startDate,
        workAuthorization: workAuthorization === 'true' || workAuthorization === true,
        relocate: relocate === 'true' || relocate === true,
        experience,
        skills: skillsArray
      });

      await application.save();

      res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
      console.error('Error submitting application:', error.message);
      res.status(500).json({ message: 'Failed to submit application', error: error.message });
    }
  }
);

router.get('/:id', isAuthenticated, isProvider, async (req, res) => {
  try {
    const { id } = req.params;
    const applications = await Application.find({ jobId: id });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
});


module.exports = router;