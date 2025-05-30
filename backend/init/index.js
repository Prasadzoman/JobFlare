const express = require('express');
const mongoose=require('mongoose');
const jobs=require('./jobs')
const app=express();
const Listing=require('../model/Listings');
require('dotenv').config({ path: '../.env' });


async function main() {
  try {
    const url=`mongodb+srv://${process.env.USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.sfyzlcb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}


const init=async()=>{
    await main();
     await Listing.deleteMany({})
    try {
    for (let job of jobs) {
      const listing = new Listing({
        userId:"6839d72acd0d1e5485684e2e",
        title: job.title,
        description: job.description,
        company: job.company,
        location: job.location,
        salary: job.salary,
        logo: job.logo,
        type: job.type,
        experience: job.experience,
        skills: job.skills,
        datePosted: new Date(job.postedDate)
      });
      await listing.save();
    }
    console.log('Jobs initialized successfully');
  } catch (error) {
    console.error('Error saving jobs:', error);
  }
    console.log('Jobs initialized successfully');
    mongoose.disconnect();
}

init()