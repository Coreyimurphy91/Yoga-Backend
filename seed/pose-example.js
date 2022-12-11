const Pose = require('../models/pose');

const poses = [
  { name: 'Warrior 1', completed: true}, 
  { body: 'Warrior 2', completed: false}
];
const onePose = { name: 'Warrior 3', completed: true };


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
// addOnePose();