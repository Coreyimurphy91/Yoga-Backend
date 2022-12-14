require('dotenv').config()
const Pose = require('../models/pose');
const Tag = require('../models/tag');
const mongoose = require('mongoose');
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
})

db.dropCollection('tags')
db.dropCollection('poses')

const tags = [
  {
    name: 'standing'
  },
  {
    name: 'sitting'
  }
  ]

  const addManyTags = async () => {
    const savedTags = await Tag.insertMany(tags);
    console.log('=======> Saved Tags.');
    console.log(savedTags);
    return savedTags
  }

  const addPosesWithTags = async () => {
    const newTags = await addManyTags();

  

    const poses = [
      { 
        name: 'Warrior 1', 
        description: 'be a frickin warrior',
        difficulty: 1,
        time: 10,
        imageURL: 'testurl',
        tags: newTags.filter(t => t.name === 'standing')
      }, 
      { 
        name: 'Warrior 2', 
        description: 'be a frockon warrior',
        difficulty: 1,
        time: 10,
        imageURL: 'testurl2',
        tags: newTags.filter(t => t.name === 'standing' || t.name === 'sitting')
      }, 
    ];
    const addManyPoses = async () => {
      const savedPoses = await Pose.insertMany(poses);
      console.log('=======> Saved Poses.');
      console.log(savedPoses);
    }
    addManyPoses();
  }
addPosesWithTags();

// const onePose =   { 
//     name: 'Warrior 3', 
//     description: 'be a fruckun warrior',
//     difficulty: 1,
//     time: 10,
//     imageURL: 'testurl',
//     // tags: 'standing'
//   } ;




// const addOnePose = async () => {
//   const savedOnePose = await Pose.create(onePose);
//   console.log('=======> Saved One Pose.');
//   console.log(savedOnePose);
// }

// run the functions
// addOnePose();