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
    name: 'arm-balancing'
  },
  {
    name: 'balancing'
  },
  {
    name: 'bind'
  },
  {
    name: 'chest-opener'
  },
  {
    name: 'core'
  },
  {
    name: 'forward-bend'
  },
  {
    name: 'hip-opener'
  },
  {
    name: 'inversion'
  },
  {
    name: 'kneeling'
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
    name: 'shoulders'
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
  {
    name: 'warm-up'
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
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'core' || t.name === 'hip-opener'|| t.name === 'stretch-arms' || t.name === 'stretch-back' || t.name === 'stretch-legs')
      }, 
      { 
        name: 'Banana', 
        description: 'Banana pose, or kadalikā in Sanskrit, is a supine full-body stretch pose. Laying on your back, bring your hands overhead, interlace your fingers or catch the opposite wrist. Extend your spine and keep your legs together. With your glutes and hips connected to the floor, walk your feet and upper body to one side. When your body becomes more flexible, arch a little more, keeping both hips on the floor. Come back to center.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/banana_R.png',
        tags: newTags.filter(t => t.name === 'supine' || t.name === 'stretch-arms' || t.name === 'stretch-core'|| t.name === 'stretch-legs' || t.name === 'warm-up')
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
        name: 'Bridge', 
        description: 'Bridge pose, or Setu Bandha Sarvangasana in Sanskrit, is a supine full body pose. From a supine position, on your back, the hips are pressed up with the heels of the feet rooted into the earth close to the sits bones. The toes are actively lifted and the pelvis tucked. The thighs are parallel to the earth and the fingers are interlaced under the body with the ribcage lifted and the heart open. The back of the neck rests on the earth. The gaze is to the sky.',
        difficulty: 2,
        time: 10,
        imageURL: 'https://pocketyoga.com/assets/images/full/bridge.png',
        tags: newTags.filter(t => t.name === 'supine' || t.name === 'core' || t.name === 'chest-opener' || t.name === 'strength')
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
        name: 'Bow', 
        description: 'Bow pose, or Dhanurasana in Sanskrit, is a prone stretching pose. From a prone position with the abdomen on the earth, the hands grip the ankles (but not the tops of the feet) with knees no wider than the width of your hips. The heels are lifted away from the buttocks and at the same time the thighs are lifted away from the earth working opposing forces as the heart center, hips and back open. The gaze is forward.',
        difficulty: 2,
        time: 10,
        imageURL: 'https://pocketyoga.com/assets/images/full/bow.png',
        tags: newTags.filter(t => t.name === 'prone' || t.name === 'stretch-legs' || t.name === 'stretch-core' || t.name === 'core')
      }, 
      { 
        name: 'Bird of Paradise', 
        description: 'Bird of paradise pose, or Svarga Dvijasana in Sanskrit, is a beautiful standing balancing pose. One foot stays rooted into the earth and straightens while the opposite leg comes up with a bent knee. Once you are standing upright extend the leg toward the sky. The ribcage is lifted and the heart is open in the full expression of the pose. The gaze is forward.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/chair_twist_bind_up_L.png',
        tags: newTags.filter(t => t.name === 'standing' || t.name === 'balance' || t.name === 'core' || t.name === 'strength' || t.name === 'chest-opener')
      }, 
      { 
        name: 'Revolved Bird of Paradise', 
        description: 'Revolved bird of paradise pose, or Parivritta Svarga Dvijasana in Sanskrit, is a challenging variation of bird of paradise. The lower arm reaches back around the legs as the upper arm wraps around the back and the fingers of the respective hands eventually meet and interlace. One foot stays rooted into the earth and straightens while the opposite leg comes up with a bent knee. Once you are standing upright extend the leg toward the sky. The ribcage is lifted and the heart is open in the full expression of the pose. The gaze is forward.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/bird_of_paradise_revolved_R.png',
        tags: newTags.filter(t => t.name === 'standing' || t.name === 'balance' || t.name === 'core' || t.name === 'stretch-core' || t.name === 'strength')
      }, 
      { 
        name: 'Butterfly', 
        description: 'Butterfly pose, or Citrapataṅgaḥ in Sanskrit, is a restful seated pose. From a seated position, bring the soles of the feet together and slide them away from the groin to form a diamond shape. Hinge forward and bring the forehead towards the heels, allowing the back to round. Hands can rest on your feet or on the floor. Allow your neck to relax and close your eyes, and breathe. A block can be placed between the feet to rest the forehead on.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/butterfly.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'stretch-back' || t.name === 'warm-up')
      }, 
      { 
        name: 'Cat', 
        description: 'Cat pose, or Bidalasana in Sanskrit, is a kneeling pose that inverses cow. From table pose, shift some weight to the palms. The wrists, elbows and shoulders are in one line. The abdomen is pulled in and up with the spine arched in a strong Cobra spine. The crown of the head is toward the earth and the neck is relaxed. The gaze is between the arms toward the belly.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/cat.png',
        tags: newTags.filter(t => t.name === 'kneeling' || t.name === 'stretch-back' || t.name === 'warm-up')
      }, 
      { 
        name: 'Caterpillar', 
        description: 'Catterpillar pose, or Bisa in Sanskrit, is a restful seated stretch. Begin in a seated position with your legs straight in front. Fold forward over the legs, allowing the back to round. Hands can be on the floor, or may catch your shins, ankles, or toes. Sit on a blanket to support this pose if needed.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/caterpillar.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'stretch-back')
      }, 
      { 
        name: 'Chair', 
        description: 'Chair pose, or Utkatasana in Sanskrit, is a standing pose of strength. From a standing position, the feet are together and rooted into the earth with toes actively lifted. The knees are bent and the weight of the body is on the heels of the feet. The pelvis is tucked in and the ribcage is lifted. The neck is a natural extension of the spine. The arms are lifted up toward the sky with the elbows straight and the biceps by the ears. The hands can be together or separated and facing each other with the fingers spread wide. The gaze is forward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/chair.png',
        tags: newTags.filter(t => t.name === 'core' || t.name === 'standing' || t.name === 'strength' || t.name === 'stretch-arms' || t.name === 'stretch-back')
      }, 
      { 
        name: 'Child', 
        description: 'Child\'s pose, or Balasana in Sanskrit, is kneeling pose of rest. From a kneeling position, the toes and knees are together with most of the weight of the body resting on the heels of the feet. The arms are extended back resting alongside the legs. The forehead rests softly onto the earth. The gaze is down and inward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/child_traditional.png',
        tags: newTags.filter(t => t.name === 'kneeling' || t.name === 'restorative' || t.name === 'hip-opener')
      }, 
      { 
        name: 'Cobra', 
        description: 'Cobra pose, or Bhujangasana in Sanskrit, is a proning core stretching pose. Begin by lying face down with your legs extended behind you, hip-width apart and the tops of your feet rested. Spread your fingers wide and place your hands under your shoulders with your fingers pointing toward the top of the mat. Hug your elbows into the sides of your body. Press down through the tops of your feet and lift your head and chest off the floor. Keep your lower ribs on the floor. Draw your shoulders back and your heart forward keeping your head a natural extension of your spine and your shoulders rolled down and away from your ears. Begin to straighten your arms and lift your chest off the floor. Press the tops of your thighs down firmly into the floor. This is Low Cobra. Little to no weight on your hands. If your flexibility allows, you can straighten your arms all the way while maintaining the connection of the front of your pelvis and legs with the floor.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/cobra_full.png',
        tags: newTags.filter(t => t.name === 'prone' || t.name === 'strength' || t.name === 'stretch-core')
      }, 
      { 
        name: 'Corpse', 
        description: 'Corpse pose, or Shavasana in Sanskrit, is a restful supine position. The body rests on the earth in a supine position with the arms resting by the side body. The palms are relaxed and open toward the sky. The shoulder blades are pulled back, down and rolled under comfortably, resting evenly on the earth. The legs are extended down and splayed open. The heels are in and the toes flop out. The eyes are closed. Everything is relaxed. The gaze is inward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/corpse.png',
        tags: newTags.filter(t => t.name === 'restorative' || t.name === 'supine')
      }, 
      { 
        name: 'Reverse Corpse', 
        description: 'Corpse pose, or Advasana in Sanskrit, is a restful prone position. From a prone position, relax down onto your belly, legs extended straight back. Forehead and chin are centered allowing for a neutral neck and spine. Extend your arms overhead, palms facing down.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/corpse_front_arms_forward.png',
        tags: newTags.filter(t => t.name === 'prone' || t.name === 'restorative')
      }, 
      { 
        name: 'Cow', 
        description: 'Cow pose, or Bitilasana in Sanskrit, is a kneeling pose that inverses cat. From table pose, the ribcage is lifted with a gentle sway in the low back. The tailbone lifts up into dog tilt. The eyes are soft and the gaze is to the sky.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/dog.png',
        tags: newTags.filter(t => t.name === 'kneeling' || t.name === 'stretch-core' || t.name === 'warm-up')
      }, 
      { 
        name: 'Crane', 
        description: 'Crane pose, or Bakasana in Sanskrit, is an arm-balancing pose of strength. Come to a squatting position with both feet together. Separate your knees but keep your feet together. Spread your fingers wide and press your palms and fingertips into the mat. Come up high on your toes and lift your hips as high as possible. Keeping straight arms, place your knees up into your arm pits, engage your core and begin to hinge forward. Once your toes lift off the ground, find your balance and pull your heels up close to your sit bones. Keep your chin lifted and gaze slightly forward on the ground.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/crane.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'balancing' ||t.name === 'core' || t.name === 'inversion' || t.name === 'shoulders' || t.name === 'strength')
      }, 
      { 
        name: 'Crescent Lunge', 
        description: 'Crescent lunge pose, or Ashta Chandrasana in Sanskrit, is a standing posture that strengthens the legs and opens the chest. The front foot of one leg is rooted on the earth with the knee directly above and tracking the ankle in a 90-degree angle. The back leg is straight, no bend in the knee, and the weight is distributed backwards onto the toes as the back heel pushes back and down toward the earth. The inner thighs scissor toward each other and the pelvis is tucked under with the ribcage lifted and the chin slightly tucked. The spine is long and extended. The heart is open. The arms are straight with no bend in the elbows or the wrists. The hands can be together or separated and facing each other with the fingers spread wide. Gaze is natural and forward.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/lunge_crescent_L.png',
        tags: newTags.filter(t => t.name === 'standing' || t.name === 'balance' || t.name === 'core' || t.name === 'stretch-legs')
      }, 
      { 
        name: 'Crescent Lunge on the Knee', 
        description: 'Crescent lunge on the knee pose, or Anjaneyasana in Sanskrit, is a half-kneeling variation of crescent lunge that strengthens the legs and opens the chest. The front knee is bent in a 90-degree angle directly above the ankle and the back knee is resting on the earth with the top of the back foot pressed firmly into the earth. The hips are squared and pressed forward. The inner thighs scissor toward each other. The pelvis is tucked under to protect the low back. The ribcage is lifted. The arms are lifted. The hands can be together or separated and facing each other with the fingers spread wide. The gaze is forward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/warrior_i_kneeling_L.png',
        tags: newTags.filter(t => t.name === 'standing' || t.name === 'balance' || t.name === 'core' || t.name === 'stretch-legs' || t.name === 'shoulders')
      },
      { 
        name: 'Standing Crescent Moon', 
        description: 'Crescent moon pose, or Indudalasana in Sanskrit, is a standing posture that lengthens the rib cage. From mountain with arms up pose, extend upwards toward the sky as you bend to one side, lengthening the opposite side of the rib cage and stretch.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/crescent_moon_R.png',
        tags: newTags.filter(t => t.name === 'standing' || t.name === 'balance' || t.name === 'stretch-core')
      }, 
      { 
        name: 'Crow', 
        description: 'Crow pose, or Kakasana in Sanskrit, is an inverted, arm-balancing pose. Come to a squatting position with both feet together. Separate your knees but keep your feet together. Spread your fingers wide and press your palms and fingertips into the mat. Come up high on your toes and lift your hips as high as possible. As you shift the weight of your body slightly forward, bend your arms and place your knees on top of your elbows. Continue shifting forward until your toes lift up and the full weight of the body is on your arms. The gaze is down and slightly forward.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/crow.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'shoulders' || t.name === 'strength')
      },
      { 
        name: 'Dolphin', 
        description: 'Dolphin pose, or Ardha Pincha Mayurasana in Sanskrit, is an arm and leg supported pose. From downward-facing dog pose, the forearms are planted onto the earth with the elbows narrow and the palms down in a Sphinx position. The pelvis is tucked. The ribcage lifted. The feet are rooted and the legs are straight with the tailbone in dog tilt. The gaze is down and slightly forward.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/dolphin.png',
        tags: newTags.filter(t => t.name === 'core' || t.name === 'forward-bend' || t.name === 'shoulders' || t.name === 'strength')
      },
      { 
        name: 'Easy Seat', 
        description: 'Easy seat pose, or Sukhasana in Sanskrit, is a neutral seated posture. From a seated position, bring your knees into a simple cross legged pose. Both knees should be below the hips. Place the hands on the thighs or knees and keep the spine straight.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/easy.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'stretch-back' || t.name === 'warm-up')
      },
      { 
        name: 'Half Pigeon', 
        description: 'Lotus pose, or Ardha Kapotasana in Sanskrit, is a kneeling lunge-like posture. From a lounging position, the hips are parallel and squared to the earth with the front knee bent in a 90-degree angle and flat on the earth. The front foot rests close to the groin. The back leg is extended with the knee and the back foot squared, parallel and pressed firmly into the earth. The ribcage is lifted. The heart is open. Fingers rest on the earth by the side body. The gaze is forward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/pigeon_half_L.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'core' || t.name === 'hip-opener')
      }, 
      { 
        name: 'Lotus', 
        description: 'Lotus pose, or Padmasana in Sanskrit, is a seated pose that emphasizes posture. Bring the bottom ankle and place it on top of the opposite knee, both ankles will be resting on top of the thighs.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/lotus_full.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'core' || t.name === 'hip-opener')
      }, 
      { 
        name: 'Table', 
        description: 'Table pose, or Chakravakasana in Sanskrit, is a neutral kneeling posture. From a kneeling position, the knees and arms form a box with the spine and neck in a neutral position. The hips and shoulders are squared to the earth and the palms are rooted with the weight of the body equally distributed between the heel of the hands and the top of the knees. The joints are stacked with the wrists, elbows and shoulders in a straight line. The gaze is down.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/box_neutral.png',
        tags: newTags.filter(t => t.name === 'kneeling' || t.name === 'core' || t.name === 'warm-up')
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