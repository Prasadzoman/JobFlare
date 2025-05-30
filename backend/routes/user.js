const express=require('express');
const router=express.Router();
const User=require('../model/User');
const passport = require('passport');
const Listing = require('../model/Listings');
const Application = require('../model/Application');
const {isAuthenticated}=require('../middleware');
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        const user = new User({ email, name, role });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, err => {
            if (err) return res.status(500).json({ error: err.message });
            return res.json({ message: "Registered and logged in", user: registeredUser });
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message || 'Login failed' });
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Logged in', user });
    });
  })(req, res, next);
});

router.post('/logout',isAuthenticated, (req, res) => {
    req.logout(() => {
        res.json({ message: "Logged out" });
    });
});

router.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: "Not logged in" });
    }
});

router.get('/applications',isAuthenticated,async(req,res)=>{
    const id=req.user?._id;
    const resp=await Application.find({userId:id});
    res.json(resp)
})

router.get('/:id',isAuthenticated,async(req,res)=>{
    const {id}=req.params;
    const resp=await Listing.find({userId:id});
    res.json(resp)
});

module.exports=router;


