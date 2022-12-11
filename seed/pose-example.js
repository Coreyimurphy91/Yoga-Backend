const Pose = require('../models/pose');
const mongoose = require('mongoose');

const poses = [
  { 
    name: 'Warrior 1', 
    description: 'be a frickin warrior',
    difficulty: 1,
    time: 10,
    imageURL: 'testurl',
    // tags: 'standing'
  }, 
  { 
    name: 'Warrior 2', 
    description: 'be a frockon warrior',
    difficulty: 1,
    time: 10,
    imageURL: 'testurl2',
    // tags: 'standing'
  }, 
];

const onePose =   { 
    name: 'Warrior 3', 
    description: 'be a fruckun warrior',
    difficulty: 1,
    time: 10,
    imageURL: 'testurl',
    // tags: 'standing'
  } ;


const addManyPoses = async () => {
  const savedPoses = await Pose.insertMany(poses);
  console.log('=======> Saved Poses.');
  console.log(savedPoses);
}

const addOnePose = async () => {
  const savedOnePose = await Pose.create(onePose);
  console.log('=======> Saved One Pose.');
  console.log(savedOnePose);
}

// run the functions
// addManyPoses();
addOnePose();