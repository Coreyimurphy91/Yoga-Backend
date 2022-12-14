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
    name: 'arm balancing'
  },
  {
    name: 'back bend'
  },
  {
    name: 'balancing'
  },
  {
    name: 'bind'
  },
  {
    name: 'chest opener'
  },
  {
    name: 'core'
  },
  {
    name: 'forward bend'
  },
  {
    name: 'hip opener'
  },
  {
    name: 'inversion'
  },
  {
    name: 'restorative'
  },
  {
    name: 'prone'
  },
  {
    name: 'seated'
  },
  {
    name: 'standing'
  },
  {
    name: 'strength'
  },
  {
    name: 'stretch-arms'
  },
  {
    name: 'stretch-back'
  },
  {
    name: 'stretch-core'
  },
  {
    name: 'stretch-legs'
  },
  {
    name: 'supine'
  },
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
        name: 'Archer', 
        description: 'Archer pose, or akarna dhanurasana in Sanskrit, begins in seated position with your legs straight in front and hinge forward. Wrap your index and middle fingers around your big toes. Bend one knee and place the heel on the floor a few inches away from your opposite inner knee. Press the back of your straight leg into the floor then hinge slightly forward. Keep a strong hold of both big toes and pick up the leg of your bent knee. You may need to lean your weight slightly over towards the straight leg. Draw your elbow and shoulder back to bring your foot close to your ear and then root both sitting bones as much as possible.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/archer_R.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'core' || t.name === 'hip opener'|| t.name === 'stretch-arms' || t.name === 'stretch-back' || t.name === 'stretch-legs')
      }, 
      { 
        name: 'Boat', 
        description: 'Boat pose, or Navasana in Sanskrit, is a core-strengthening yoga posture. From a seated position the feet are lifted up so that the thighs are angled about 45-50 degrees relative to the earth. The legs are straight. The tailbone is lengthened into the earth and the pubis pulls toward the navel. The shoulder blades are spread across the back and the hands reach straight forward making the arms are parallel to the earth. The chin is tipped slightly toward the sternum so that the base of the skull lifts lightly away from the back of the neck. Gaze is forward.',
        difficulty: 2,
        time: 10,
        imageURL: 'https://pocketyoga.com/assets/images/full/boat_full.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'core' || t.name === 'stretch-legs' || t.name === 'balance')
      }, 
      { 
        name: 'Half Boat', 
        description: 'Half boat pose, or Ardha Navasana in Sanskrit, is an easier variation of the boat yoga posture. From a seated position the hands are gripped around the back of the legs and the knees are bent in a 90-degree angle. Both legs are pulled in toward the abdomen. The core is engaged to maintain balance on the sits bones (be sure that the back does not round). The front of the torso lengthens between the pubis and top of the sternum as the spine extends in both directions reaching up to the sky and rooting down to the earth. The gaze is forward.',
        difficulty: 1,
        time: 10,
        imageURL: 'https://pocketyoga.com/assets/images/full/boat_half.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'core' || t.name === 'balance')
      }, 
      { 
        name: 'Bird of Paradise', 
        description: 'Bird of paradise pose, or Svarga Dvijasana in Sanskrit, is a beautiful standing balancing pose. One foot stays rooted into the earth and straightens while the opposite leg comes up with a bent knee. Once you are standing upright extend the leg toward the sky. The ribcage is lifted and the heart is open in the full expression of the pose. The gaze is forward.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/chair_twist_bind_up_L.png',
        tags: newTags.filter(t => t.name === 'standing' || t.name === 'balance' || t.name === 'core' || t.name === 'strength' || t.name === 'chest opener')
      }, 
      { 
        name: 'Revolved Bird of Paradise', 
        description: 'Revolved bird of paradise pose, or Parivritta Svarga Dvijasana in Sanskrit, is a challenging variation of bird of paradise. The lower arm reaches back around the legs as the upper arm wraps around the back and the fingers of the respective hands eventually meet and interlace. One foot stays rooted into the earth and straightens while the opposite leg comes up with a bent knee. Once you are standing upright extend the leg toward the sky. The ribcage is lifted and the heart is open in the full expression of the pose. The gaze is forward.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/bird_of_paradise_revolved_R.png',
        tags: newTags.filter(t => t.name === 'standing' || t.name === 'balance' || t.name === 'core' || t.name === 'strength')
      }, 
      { 
        name: 'Crescent Lunge', 
        description: 'Crescent lunge pose, or Ashta Chandrasana in Sanskrit, is a standing posture that strengthens the legs and opens the chest. The front foot of one leg is rooted on the earth with the knee directly above and tracking the ankle in a 90-degree angle. The back leg is straight, no bend in the knee, and the weight is distributed backwards onto the toes as the back heel pushes back and down toward the earth. The inner thighs scissor toward each other and the pelvis is tucked under with the ribcage lifted and the chin slightly tucked. The spine is long and extended. The heart is open. The arms are straight with no bend in the elbows or the wrists. The hands can be together or separated and facing each other with the fingers spread wide. Gaze is natural and forward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/lunge_crescent_L.png',
        tags: newTags.filter(t => t.name === 'standing' || t.name === 'balance' || t.name === 'core' || t.name === 'strength')
      }, 
      { 
        name: 'Crescent Lunge on the Knee', 
        description: 'Crescent lunge on the knee pose, or Anjaneyasana in Sanskrit, is a half-kneeling posture that strengthens the legs and opens the chest. The front knee is bent in a 90-degree angle directly above the ankle and the back knee is resting on the earth with the top of the back foot pressed firmly into the earth. The hips are squared and pressed forward. The inner thighs scissor toward each other. The pelvis is tucked under to protect the low back. The ribcage is lifted. The arms are lifted. The hands can be together or separated and facing each other with the fingers spread wide. The gaze is forward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/lunge_crescent_L.png',
        tags: newTags.filter(t => t.name === 'standing' || t.name === 'balance' || t.name === 'core' || t.name === 'strength')
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