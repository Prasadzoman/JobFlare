if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const Application = require('./model/Application');
const User = require('./model/User');
const listingRouter = require('./routes/listings');
const applicationsRouter = require('./routes/applications');
const userRouter = require('./routes/user');

const app = express();

const url=`mongodb+srv://${process.env.USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.sfyzlcb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

app.use(cors({
  origin: 'https://jobflare-client.onrender.com',
  credentials: true  
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = MongoStore.create({
  mongoUrl: url,
  crypto: {
    secret: `${process.env.SESSION_SECRET}`,
  },
  touchAfter: 24 * 3600, 
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});


const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none", 
  }
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


async function main() {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}
main();

// Routes
app.use('/listings', listingRouter);
app.use('/applications', applicationsRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Job Portal API Running');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
