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
    name: 'arm-support'
  },
  {
    name: 'balance'
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
    name: 'stretch-hips'
  },
  {
    name: 'stretch-legs'
  },
  {
    name: 'stretch-side'
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
        description: 'Banana pose, or kadalik?? in Sanskrit, is a supine full-body stretch pose. Laying on your back, bring your hands overhead, interlace your fingers or catch the opposite wrist. Extend your spine and keep your legs together. With your glutes and hips connected to the floor, walk your feet and upper body to one side. When your body becomes more flexible, arch a little more, keeping both hips on the floor. Come back to center.',
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
        name: 'Boat (Half)', 
        description: 'Half boat pose, or Ardha Navasana in Sanskrit, is an easier variation of the boat yoga posture. From a seated position the hands are gripped around the back of the legs and the knees are bent in a 90-degree angle. Both legs are pulled in toward the abdomen. The core is engaged to maintain balance on the sits bones (be sure that the back does not round). The front of the torso lengthens between the pubis and top of the sternum as the spine extends in both directions reaching up to the sky and rooting down to the earth. The gaze is forward.',
        difficulty: 1,
        time: 10,
        imageURL: 'https://pocketyoga.com/assets/images/full/boat_half.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'core' || t.name === 'balance')
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
        name: 'Bow', 
        description: 'Bow pose, or Dhanurasana in Sanskrit, is a prone stretching pose. From a prone position with the abdomen on the earth, the hands grip the ankles (but not the tops of the feet) with knees no wider than the width of your hips. The heels are lifted away from the buttocks and at the same time the thighs are lifted away from the earth working opposing forces as the heart center, hips and back open. The gaze is forward.',
        difficulty: 2,
        time: 10,
        imageURL: 'https://pocketyoga.com/assets/images/full/bow.png',
        tags: newTags.filter(t => t.name === 'core' || t.name === 'prone' || t.name === 'stretch-core' || t.name === 'legs')
      }, 
      { 
        name: 'Bow (Standing)', 
        description: 'Standing bow pose, or Dandayamana Dhanurasana in Sanskrit, is a standing stretch pose. Begin from a standing position with the weight of the body on one foot as the opposite heel lifts up toward the buttocks with a bent knee. The hand on the same side of the body as the bent knee reaches back to grasp the outside of the foot or ankle. With the added resistance of the hand gripping the foot, the bent leg and foot is then lifted up away from the earth and the torso toward the back of the room until the thigh is parallel to the earth. Then the arm on the same side of body as the standing leg extends up and forward to the front. The gaze is forward. Avoid compression in the lower back by actively lifting the pubis toward the navel while at the same time, pressing the tailbone toward the floor.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/lord_of_the_dance_L.png',
        tags: newTags.filter(t => t.name === 'balance' || t.name === 'standing' || t.name === 'stretch-core' || t.name === 'stretch-legs')
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
        name: 'Bird of Paradise (Revolved)', 
        description: 'Revolved bird of paradise pose, or Parivritta Svarga Dvijasana in Sanskrit, is a challenging variation of bird of paradise. The lower arm reaches back around the legs as the upper arm wraps around the back and the fingers of the respective hands eventually meet and interlace. One foot stays rooted into the earth and straightens while the opposite leg comes up with a bent knee. Once you are standing upright extend the leg toward the sky. The ribcage is lifted and the heart is open in the full expression of the pose. The gaze is forward.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/bird_of_paradise_revolved_R.png',
        tags: newTags.filter(t => t.name === 'standing' || t.name === 'balance' || t.name === 'core' || t.name === 'stretch-core' || t.name === 'stretch-hips' || t.name === 'strength')
      }, 
      { 
        name: 'Butterfly', 
        description: 'Butterfly pose, or Citrapata???ga??? in Sanskrit, is a restful seated pose. From a seated position, bring the soles of the feet together and slide them away from the groin to form a diamond shape. Hinge forward and bring the forehead towards the heels, allowing the back to round. Hands can rest on your feet or on the floor. Allow your neck to relax and close your eyes, and breathe. A block can be placed between the feet to rest the forehead on.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/butterfly.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'stretch-back' || t.name === 'warm-up')
      }, 
      { 
        name: 'Camel', 
        description: 'Camel pose, or Ushtrasana in Sanskrit, is a kneeling pose. From a kneeling position the knees are hip width apart and the thighs are perpendicular to the earth. The inner thighs are narrowed and rotated slightly inward with the buttocks engaged but not hardened. The tailbone is tucked under but the hips do not puff forward. The shins and tops of the feet are pressed firmly into the earth. The ribcage is open, along with the heart center, but the lower front ribs do not protrude sharply toward the sky. The lower back lifts the ribs away from the pelvis to keep the lower spine as long as possible. The base of the palms are pressed firmly against the soles (or heels) of the feet and the fingers are pointed toward the toes. The arms are extended straight and are turned slightly outward at the shoulder joint so the elbow creases face forward without squeezing the shoulder blades together. The neck is in a relatively neutral position, neither flexed nor extended, or (for the advanced practitioners only) the head drops back. Be careful not to strain your neck and harden your throat. The gaze is either toward the sky or toward the earth, depending upon your flexibility.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/camel.png',
        tags: newTags.filter(t => t.name === 'kneeling' || t.name === 'stretch-core' || t.name === 'stretch-hips')
      }, 
      { 
        name: 'Cat', 
        description: 'Cat pose, or Bidalasana in Sanskrit, is a kneeling pose that inverses cow. From table pose, shift some weight to the palms. The wrists, elbows and shoulders are in one line. The abdomen is pulled in and up with the spine arched in a strong Cobra spine. The crown of the head is toward the earth and the neck is relaxed. The gaze is between the arms toward the belly.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/cat.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'kneeling' || t.name === 'stretch-back' || t.name === 'warm-up')
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
        name: 'Chin Stand', 
        description: 'Chin stand pose, or Ganda Bherundasana in Sanskrit, is a strength based inversion. Begin in table pose. Lift one leg in the air. Curl your toes of the grounded leg. Bend your elbows into a strong, narrow push-up position. Drop your chin, the front of your shoulders and chest to the ground and begin to straighten your bottom leg to send your hips higher at the same time. Lift off by taking a tiny hop with your bottom leg. As your bottom leg lifts to meet the top, bring both straight legs together in the air and squeeze your thighs together. Keep a small arch in your back.',
        difficulty: 4,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/chin_stand.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'strength')
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
        name: 'Corpse (Reverse)', 
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
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'kneeling' || t.name === 'stretch-core' || t.name === 'warm-up')
      }, 
      { 
        name: 'Cradle the Baby', 
        description: 'Cradle the baby pose, or Hindolasana in Sanskrit, is a seated stretching pose. Begin in a seated position. Bend one knee and externally rotate it out to the side. Position the knee into the crease of your elbow while bringing the foot into the crease of your opposite elbow. If you cannot bring your knee and foot into the creases of your elbows, scoop your arms under your calf and gently hug your leg closer to your chest. Keep the opposite leg long and extended and energize through the heel. Flex both feet and grow the spine tall.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/cradle_R.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'stretch-hips' || t.name === 'stretch-legs')
      }, 
      { 
        name: 'Crane', 
        description: 'Crane pose, or Bakasana in Sanskrit, is an arm-balancing pose of strength. Come to a squatting position with both feet together. Separate your knees but keep your feet together. Spread your fingers wide and press your palms and fingertips into the mat. Come up high on your toes and lift your hips as high as possible. Keeping straight arms, place your knees up into your arm pits, engage your core and begin to hinge forward. Once your toes lift off the ground, find your balance and pull your heels up close to your sit bones. Keep your chin lifted and gaze slightly forward on the ground.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/crane.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'balance' || t.name === 'core' || t.name === 'inversion' || t.name === 'shoulders' || t.name === 'strength')
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
        name: 'Crescent Moon (Standing)', 
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
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'core' || t.name === 'forward-bend' || t.name === 'shoulders' || t.name === 'strength' || t.name === 'stretch-legs')
      },
      { 
        name: 'Downward-facing Dog', 
        description: 'Downward-facing dog pose, or Adho Mukha Shvanasana in Sanskrit, is an arm and leg supported pose. The body is positioned in an inverted "V" with the palms and feet rooted into the earth and sits bones lifted up toward the sky. The arms and legs are straight. The weight of the body is equally distributed between the hands and the feet. The eye of the elbows face forward. The ribcage is lifted and the heart is open. Shoulders are squared to the earth and rotated back, down and inward. The neck is relaxed and the crown of the head is toward the earth. The gaze is down and slightly forward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/downward_dog.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'core' || t.name === 'forward-bend' || t.name === 'shoulders' || t.name === 'strength' || t.name === 'stretch-legs')
      },
      { 
        name: 'Eagle', 
        description: 'Eagle pose, or Garudasana in Sanskrit, is a standing balance pose. From a standing position the one thigh is crossed over the other with the toes and/or the ankle hooked behind the lower calf. The weight of the body is balanced on the standing foot. The arms are crossed in front of the torso so that one arm is crossed above the other arm. The top arm is tucked into the elbow crook of the bottom arm. The hands are hooked around each other as well. Once hooked, the elbows lift up and the fingers stretch toward the sky. The gaze is soft and forward.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/eagle_R.png',
        tags: newTags.filter(t => t.name === 'balance' || t.name === 'standing' || t.name === 'stretch-arms' || t.name === 'stretch-back')
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
        name: 'Eight Point', 
        description: 'Eight Point pose, or Ashtangasana in Sanskrit, is a balanced prone position. Begin in table position on hand and knees. Shift your shoulders and heart forward beyond your fingertips and lower just your chest and chin to the ground. Keep your elbows narrow and in at your side with your tailbone lifting toward the sky. Press down firmly through your palms and fingertips, keeping your shoulder heads lifted as you continue to soften the place between your shoulder blades.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/eight_point.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'kneeling' || t.name === 'strength' || t.name === 'stretch-back')
      },
      { 
        name: 'Elbow Balance', 
        description: 'Elbow balance pose, or Shayanasana in Sanskrit, is a balanced inverted position. Start in your forearm balance pose. Press your forearms firmly into the ground and engage your core. Shift your weight slightly to move your legs past your head then shift more weight towards your elbows. Lift one hand from the ground and bring it to your chin. If stable, bring the opposite hand to your chin for full balance.',
        difficulty: 4,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/relaxed_stance.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'inversion' || t.name === 'strength')
      },
      { 
        name: 'Extended Puppy', 
        description: 'Extended puppy pose, or Uttana Shishosana in Sanskrit, is a prone stretching position. The body is prone to the earth and the forehead, chest and/or chin rest on the earth with the arms extended out in front pressing downward for a deeper stretch. The hips are at a 90-degree angle to the knees and pulling back toward the heels. The shins and the top of the feet are extended and firm on the earth. (A blanket can be used under the chin to relax the neck if needed). There is a slight curve in the lower back and the gaze is forward.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/puppy_extended.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'shoulders' || t.name === 'stretch-back' || t.name === 'prone')
      },
      { 
        name: 'Firefly', 
        description: 'Firefly pose, or Tittibhasana in Sanskrit, is a strength based arm-balancing pose. The arms are straight and the palms are pressed into the earth. The body is supported on the straight arms with the eye of the elbows to the front. The legs are extended straight and forward from on the outside of the arms. The ribcage is lifted. The gaze is forward.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/firefly.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'hip-opener' || t.name === 'strength')
      },
      { 
        name: 'Floating Stick', 
        description: 'Floating stick pose, or Brahmacharyasana in Sanskrit, is an intermediate arm-balancing pose. Begin in a seated position with your legs straight and place your hands on the ground at mid-thigh. Spread your fingers wide and actively ground your hands down. Seal your legs together and energize your legs to your toes. Hinge your chest slightly forward, engage your core and lift your hips up. Straighten your arms and maintain your core engagement. Shift your hips back slightly through your arms to find your center of gravity.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/floating_stick.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'strength')
      },
      { 
        name: 'Flying Man', 
        description: 'Flying man pose, or Eka Pada Koundinyasana in Sanskrit, is an advanced arm-balancing pose. From a lunge position, the palms are rooted into the earth on the inside of the thigh. Both elbows are bent in a 90-degree angle with one leg forward, extended and resting softly on the elbow. The other leg is extended back either balanced on the toes or suspended in flight with active toes. The Body is parallel to the earth. The gaze is to the front.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/lunge_hands_on_mat_flying_R.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'strength')
      },
      { 
        name: 'Flying Man (Revolved)', 
        description: 'Revolved flying man pose, or Parivritta Eka Pada Koundinyasana in Sanskrit, is an advanced arm-balancing pose. Starting from Downward-Facing Dog pose, bend both elbows to a 90-degree angle then cross one leg over the opposite elbow and extend the leg. The other leg is extended back either balanced on the toes or suspended in flight with active toes. The body is parallel to the earth. The gaze is to the front.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/flying_man_revolved_R.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'strength')
      },
      { 
        name: 'Forearm Balance', 
        description: 'Forearm balance pose, or Pincha Mayurasana in Sanskrit, is an advanced forearm-balancing pose. From an inverted position, with the body perpendicular to the earth, the weight of the body is supported on the forearms that are parallel and pressed firmly into the earth. The palms are flat. The knuckles are evenly pressed into the earth. The fingers are spread wide. Both legs reach up toward the sky in a straight line with the pelvis tucked. The ribcage is lifted. The gaze is forward.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/feathered_peacock.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'shoulders' || t.name === 'strength')
      },
      { 
        name: 'Frog', 
        description: 'Frog pose, or Bhekasana in Sanskrit, is a prone stretching pose. From bow pose, lift your chest upward. Using your hands, press the soles of your feet down, heels closer to the hips. If possible, rotate your knuckles forward and elbows toward the sky. Press your shoulder blades to touch, and keep elongating the psoas and quadriceps by pressing your pubic bone down into the earth.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/frog_traditional.png',
        tags: newTags.filter(t => t.name === 'chest-opener' || t.name === 'prone' || t.name === 'stretch-legs')
      },
      { 
        name: 'Garland', 
        description: 'Garland pose, or Malasana in Sanskrit, is a stretching squat pose. From a squatting position the feet are as close together as possible (keep your heels on the floor if you can; otherwise, support them on a folded mat). The thighs are slightly wider than the torso. The torso is leaning gently forward and tucked snugly between the thighs. The elbows are pressed against the inner knees and the palms are together in Anjali Mudra (Salutation Seal). The knees resist the elbows to help lengthen the front torso. The gaze is soft and forward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/garland_sideways_L.png',
        tags: newTags.filter(t => t.name === 'core' || t.name === 'hip-opener' || t.name === 'standing')
      },
      { 
        name: 'Gate', 
        description: 'Gate pose, or Parighasana in Sanskrit, is a side stretching pose. Begin in a kneeling position with your hips stacked over your knees. Extend one leg out to the side. Reach your arms overhead to create length and then extend your arms to the side towards your extended leg. Allow your bottom hand to rest softly on your extended leg while you stabilize your core to extend through the opposite side. Turn your torso upward and externally rotate your extended leg and toes.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/gate_R.png',
        tags: newTags.filter(t => t.name === 'kneeling' || t.name === 'stretch-legs' || t.name === 'stretch-core' || t.name === 'stretch-side')
      },
      { 
        name: 'Gate (Seated)', 
        description: 'Seated gate pose, or Parighasana in Sanskrit, is a seated side stretching pose. Sit on the floor with your torso upright and your legs wide. Bend one knee, finding an outer rotation, and place your heel behind your knee. Lift your arms up overhead, then take a side bend stretch toward your extended leg. Try to press your bottom shoulder against the inside of your extended knee. When your knee is straight, twist your torso toward the sky. Lift your opposite arm up, lean back slightly, and then, sweep it behind your ear and take hold of the outside edge of your extended foot. Press your elbows away from each other, using them like a crank to help twist your upper torso further. Turn your head to look at the sky. Repeat on opposite side.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/seated_gate_R.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'stretch-legs' || t.name === 'stretch-core' || t.name === 'stretch-side')
      },
      { 
        name: 'Goddess', 
        description: 'Goddess pose, or Utkata Konasana in Sanskrit, is a standing power-based pose. Step your feet to the side to the length of your mat and wide apart. Turn your toes out toward the corners, heels in. Bend your knees directly over your toes and lower your hips into a squat at the same time. Tuck your tailbone in slightly and press your hips forward as you draw your thighs back. Pull your lower belly in and lift through your rib cage. Keep your knees in line with your toes. Soften your shoulders.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/goddess_L.png',
        tags: newTags.filter(t => t.name === 'hip-opener' || t.name === 'standing' || t.name === 'strength')
      },
      { 
        name: 'Gorilla', 
        description: 'Gorilla pose, or Padahastasana in Sanskrit, is a standing deep-stretch pose. Begin from an upright standing position with the feet parallel (about six inches apart) and the front of the thighs contracted to lift the kneecaps. The body is bent forward from the crease of the hip joints with the legs completely straight and the torso parallel to the earth. The index and middle fingers of each hand are wrapped between the big toes and the second toes. Fingers and thumbs are curled around and under the big toes to firmly secure the wrap. The toes press down against the fingers. To fold deeper into the pose the sitting bones are lifted up toward the sky, the torso is pressed toward the thighs and the crown of the head is lowered toward the earth. Depending on flexibility, the lower back hollows to a greater or lesser degree. At the same time, without compressing the back of the neck, the sternum is lifted. The forehead stays relaxed. For the full extension of the pose the elbows bend out to the sides as the toes are pulled up. This lengthens the front and sides of the torso. For very long hamstrings, draw the forehead toward the shins. For hamstrings that are short, it is better to focus on keeping the front torso long. The gaze is down or toward the body.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/gorilla.png',
        tags: newTags.filter(t => t.name ==='inversion' || t.name === 'standing' || t.name === 'stretch-legs' || t.name === 'stretch-back')
      },
      { 
        name: 'Grasshopper', 
        description: 'Grasshopper pose, or Maksikanagasana in Sanskrit, is a strength based arm-balancing pose. Begin in revolved figure four pose. Sit a little deeper and be sure you have a strong side twist with the upper part of your arm connected to the sole of your flexed foot. Stay in your figure four twist as you drop your hands flat to the ground. Bend your elbows to about 90 degrees and shift your weight forward to lift the back foot off the floor. Try to straighten your floating leg forward and gaze to the toes of your floating leg.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/grasshopper_L.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'strength' || t.name === 'stretch-legs')
      },
      { 
        name: 'Half Moon', 
        description: 'Half moon pose, or Ardha Chandrasana in Sanskrit, is a one-legged pose. Begin in revolved figure four pose. From a standing position one leg is straight while the other is extended back parallel to the earth (or a little above parallel) and one hand is on the earth (beyond the little-toe side of the foot, about 12 inches) while the other hand is extended up toward the sky. The shoulder blades are squeezed together and the fingers move outward in opposing directions. The weight of the body is supported mostly by the standing leg while the bottom hand has very little weight on it but is used intelligently to regulate balance. The upper torso is rotated open to the sky. Both hips are externally rotated. Energy is extended actively through the flexed toes to keep the raised leg strong. The inner ankle of the standing foot is lifted strongly upward, as if drawing energy from the earth. The sacrum and scapulae are firmly pressed against the back torso and lengthen the coccyx toward the raised foot. The gaze is either up or down, depending on the condition of the neck. If injured the gaze is down.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/half_moon_L.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'core' || t.name === 'standing' || t.name === 'stretch-back' || t.name === 'stretch-legs')
      },
      { 
        name: 'Half Moon (Revolved)', 
        description: 'Half moon pose, or Parivritta Ardha Chandrasana in Sanskrit, is a one-legged variation of the half moon pose. From half moon pose, slowly bring the top hand down to replace the bottom hand. On the next inhalation, bring the opposite hand to the sky, twist the pelvis to the opposite side and stack the shoulders on top of each other. Gaze is toward the sky and if not possible, gaze is downwards.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/half_moon_revolved_L.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'core' || t.name === 'standing' || t.name === 'stretch-back' || t.name === 'stretch-core' || t.name === 'stretch-legs' || t.name === 'stretch-side')
      }, 
      { 
        name: 'Handstand', 
        description: 'Handstand pose, or Adho Mukha Vrikshasana in Sanskrit, is a neutral arm-balancing pose. In this inverted posture the weight of the body is on the hands - shoulder-width apart with fingers forward and parallel to each other (if the shoulders are tight, the index fingers are turned out slightly). The shoulder blades are firm against the back torso and pulled up toward the tailbone. The upper arms are rotated outward with the eye of the elbow to the front to keep the shoulder blades broad while the outer arms hug inward in opposing forces for balance and stability. The palms are spread and the bases of the index fingers are pressed firmly against the earth. Balance is maintained by keeping the Bandhas engaged while pressing the earth away with straight arms and flexed feet. The gaze is down and forward.',
        difficulty: 4,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/handstand.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'inversion' || t.name === 'shoulders' || t.name === 'strength')
      }, 
      { 
        name: 'Happy Baby', 
        description: 'Happy baby pose, or Ananda Balasana in Sanskrit, is a restful supine pose. From a supine position, on your back, the knees are bent slightly wider than the hips. The ankles and shins track the knees in a 90-degree angle perpendicular to the earth. The hands grip the inside sole of the flexed feet (if you have difficultly holding the feet loop a strap over each sole) and push the knees down, coaxing the thighs in toward the torso, lengthening the spine, releasing the tail bone toward the earth and extending the base of the skull away from the back of the neck. The gaze is up toward the sky.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/blissful_baby.png',
        tags: newTags.filter(t => t.name === 'restorative' || t.name === 'supine' || t.name === 'warm-up')
      }, 
      { 
        name: 'Headstand (Supported)', 
        description: 'Supported headstand pose, or Salamba Shirshasana A in Sanskrit, is an inverted balance pose. In this inverted posture, the weight of the body is evenly balanced on the forearms that are narrow. The fingers are interlaced (pinky fingers spooning). The crown of the head is resting softly on the earth (only to regulate balance) between the interlaced fingers hugging the head in order to stabilize and protect the neck. The shoulder blades are pressed against the back to widen the back as the tailbone continues to lift upward toward the heels. The gaze is straight.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/headstand_supported.png',
        tags: newTags.filter(t => t.name === 'balance' || t.name === 'core' || t.name === 'inversion' || t.name === 'shoulders' || t.name === 'strength')
      }, 
      { 
        name: 'Headstand (Tripod)', 
        description: 'Tripod headstand pose, or Mukta Hasta Shirshasana A in Sanskrit, is an inverted balance pose. The body is inverted and perpendicular to the earth with the legs extended up. The weight of the body is balanced between the crown of the head and the palms of the hands with the elbows bent in a 90-degree angle and the fingers forward. The head and hands are spaced equally forming an equilateral triangle. The neck is a natural extension of the spine. The chin is tucked slightly in toward the sternum. The toes are active and feet reach straight up toward the sky. The gaze is straight.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/headstand_tripod.png',
        tags: newTags.filter(t => t.name === 'balance' || t.name === 'core' || t.name === 'inversion' || t.name === 'shoulders' || t.name === 'strength')
      }, 
      { 
        name: 'Hero', 
        description: 'Hero pose, or Virasana in Sanskrit, is a kneeling pose that emphasizes focus. From a kneeling position on the floor (with a folded blanket to pad your knees, shins, and feet if necessary) the weight of the body is centered between your feet in a seated position. If the buttocks don\'t comfortably rest on the floor, raise them on a block placed between the feet. Make sure both sitting bones are evenly supported. There is a thumb\'s-width space between the inner heels and the outer hips. The thighs are rotated inward and the heads of the thigh-bones are pressed into the earth with the bases of your palms. The hands rest on the lap or on the thighs. The shoulder blades are firmed against the back ribs and the top of your sternum is lifted like a proud warrior. The collarbones are widened as the shoulder blades release away from the ears. The tailbone lengthens into the floor to anchor the back torso.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/hero.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'stretch-legs' || t.name === 'warm-up')
      }, 
      { 
        name: 'Heron', 
        description: 'Heron pose, or Kraunchasana in Sanskrit, is a kneeling, leg stretching pose. Begin in a seated position. Lean to one side, bend your opposite knee to roll your calf out, and place your leg in hero pose with your heel close to your hip. Distribute your weight evenly among both sit bones. Bend the opposite leg out in front of you, take a hold of the heel with both hands and begin to straighten it. Keep your spine long, chest open and the sternum lifted.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/heron_R.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'stretch-legs')
      }, 
      { 
        name: 'Lizard', 
        description: 'Lizard pose, or Uttana Pristhasana in Sanskrit, is a plank-variant pose. Begin in table or downward-facing dog pose. Step one foot forward to the outside edge of the same side hand. Both arms should be on the inside of your front bent knee. Keep your front knee stacked over your ankle. Stay on the ball of your back foot, extend it back as far as possible and actively keep your quadriceps engaged by drawing your kneecap up. Distribute your weight evenly among both of your hips. If you feel comfortable, lower down onto both forearms. Keep your chin lifted and your chest open.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/lizard_L.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'balance' || t.name ==='hip-opener' || t.name === 'stretch-legs')
      }, 
      { 
        name: 'Lizard (Flying)', 
        description: 'Flying lizard pose, or Utthan Pristhasana in Sanskrit, is a strength based variant of the lizard pose. Come into your lizard pose with straight arms and stay on your back toes. Bend your elbows into Chaturanga arms and stay squared by keeping your shoulders in line with your elbows. Walk your inside shoulder under your front bent thigh so your thigh is high on your tricep. Hinge your body forward and lift your front foot off the ground, gaze forward. Continue hugging your arm with your thigh and pull your heel under and up towards your glutes. Float your back extended leg off the floor.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/flying_lizard_L.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'shoulders')
      }, 
      { 
        name: 'Locust One', 
        description: 'Locust one pose, or Shalabhasana A in Sanskrit, is a prone core based pose. From a prone position (pad the floor below your pelvis and ribs with a folded blanket if needed) with the arms along the side body, palms facing up, lift the legs away from the floor until resting on the lower ribs, belly, and front pelvis with firm buttocks, energy extended through strong legs and active toes. The arms are engaged with the tops of the hands pressing down to the ground. Extend through your neck and take your eye gaze upwards. Avoid tilting the head back. Instead elongate the neck and the trapezius by engaging the latissimus dorsi muscle.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/locust.png',
        tags: newTags.filter(t => t.name === 'core' || t.name === 'stretch-legs' || t.name === 'prone')
      }, 
      { 
        name: 'Locust Two', 
        description: 'Locust two pose, or Shalabhasana B in Sanskrit, is a prone core based pose. From a prone position, bend your elbows and bring your palms by your side body. Fingers face forward and elbows hug inward. Push down into your palms and lift your chest and head off the floor. Extend your legs upward at the same time. Lengthen your entire body and avoid bending the knees. Extend through your neck and take your eye gaze upwards.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/locust_ii.png',
        tags: newTags.filter(t => t.name === 'core' || t.name === 'stretch-legs' || t.name === 'prone')
      }, 
      { 
        name: 'Locust Three', 
        description: 'Locust three pose, or Shalabhasana C in Sanskrit, is a prone core based pose. Begin lying on your belly with your arms extended overhead, like in reverse corpse pose. On the Inhale, lift your chest and your thighs off the ground and continue breathing. Extend energy through to your toes and your fingers. Bring your thighs and big toes to touch. Your neck is a natural extension of your spine and gaze is slightly forward.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/locust_iii.png',
        tags: newTags.filter(t => t.name === 'core' || t.name === 'stretch-legs' || t.name === 'prone')
      }, 
      { 
        name: 'Lord of the Fishes', 
        description: 'Lotus pose, or Paripurna Matsyendrasana in Sanskrit, is a seated stretching pose. Begin in half lotus pose with your right foot resting on top of your left thigh. Bend your left knee toward your chest and twist towards the left. Reach around with your left arm and grip your right ankle firmly with your left hand. Twist deeper to bring your right shoulder over your left knee and then grab your left foot with your right hand. Breathe and repeat on opposite side.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/lord_of_the_fishes_R.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'stretch-arms' || t.name === 'stretch-hips' || t.name === 'stretch-back')
      }, 
      { 
        name: 'Lotus', 
        description: 'Lotus pose, or Padmasana in Sanskrit, is a seated pose that emphasizes posture. Bring the bottom ankle and place it on top of the opposite knee, both ankles will be resting on top of the thighs.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/lotus_full.png',
        tags: newTags.filter(t => t.name === 'hip-opener' || t.name === 'seated')
      }, 
      { 
        name: 'Lotus (Half)', 
        description: 'Half lotus pose, or Ardha Padmasana in Sanskrit, is a seated pose that emphasizes posture. From a seated position, bend one knee and bring the ankle to the crease of the opposite hip so the sole of the foot faces the sky. Bend the other knee, and cross the ankle beneath the opposite knee. Place the hands on the thighs or knees and keep the spine straight.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/lotus_half.png',
        tags: newTags.filter(t => t.name === 'hip-opener' || t.name === 'seated')
      }, 
      { 
        name: 'Lunge', 
        description: 'Lunge pose, or Utthita Ashwa Sanchalanasana in Sanskrit, is an arm supported pose. The weight of the body is supported on the front foot and the back toes. The front knee is bent directly above the ankle in a 90-degree angle to the ankle. The back heel is pressed to the back. The inner thighs scissor toward each other and the hips are squared. The ribcage is lifted and the heart is open. The fingertips straddle the front leg and rest softly on the earth for balance. You may use a block if necessary to keep the proper alignment. The gaze is down and slightly forward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/lunge_L.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'balance' || t.name === 'stretch-legs')
      }, 
      { 
        name: 'Monkey (Crooked)', 
        description: 'Crooked Monkey pose, or Vakra Hanumanasana in Sanskrit, is an arm supported, stretch pose. Begin in a low lunge with both hands on the inside of your front foot and bent knee. Drop your back knee to the ground, send it back further and hinge forward slightly to open your hip flexor. Pivot your top foot to the corner at about a 45-degree angle. Flex and firm up your top foot and ankle then allow your front bent knee to rotate outward. Ground your outside palm to the mat. Bend your back knee, reach around with your free hand to catch your foot or ankle and externally rotate your shoulder. Ensure the weight is on top of your knee and not directly on your knee cap. Allow your spine to twist and your chest to rotate upward, broadening your collar bone.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/crooked_monkey_R.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'balance' || t.name === 'hip-opener' || t.name === 'kneeling' || t.name === 'stretch-legs')
      }, 
      { 
        name: 'Moon Bird', 
        description: 'Moon bird pose, or Eka Pada Shirshasana in Sanskrit, is an arm-balancing, stretch pose. Begin with your foot behind your head. Ground your palms by your hips. Press into your palms, straighten your arms and lift your hips off the ground. Extend through your straight leg and using your core, bring it to about 60 to 75 degrees from the ground towards your chin.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/foot_behind_head_elevated_R.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'hip-opener' || t.name === 'stretch-back' || t.name === 'stretch-legs')
      }, 
      { 
        name: 'Mountain', 
        description: 'Mountain pose, or Tadasana in Sanskrit, is a neutral standing pose. The body is in the standing position, with the feet together and rooted into the earth. The weight of the body is evenly distributed on the four corners of the feet. The pelvis is tucked. The ribcage is lifted. The neck is a natural extension of the spine and the chin is slightly tucked toward the sternum. The shoulders are relaxed as they rotate back and down. The arms at your sides. The gaze is forward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/mountain_arms_side.png',
        tags: newTags.filter(t => t.name === 'restorative' || t.name === 'standing' || t.name === 'warm-up')
      }, 
      { 
        name: 'Peacock', 
        description: 'Peacock pose, or Mayurasana in Sanskrit, is an arm-balancing pose. Begin in a kneeling position with the toes curled and knees wide. Bring your elbows close together in front of your ribs or upper belly, above the navel, forearms facing up. Lean forward and place both hands down to the ground with the fingertips facing back. Create a shelf for your body using your upper arms and send your chest forward. Walk your legs back slightly and begin to lift your knees off the ground. Knees can stay bent. Once you feel balanced, extend your legs straight back into the full variation of the pose.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/peacock.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'strength')
      }, 
      { 
        name: 'Pendant', 
        description: 'Pendant pose, or Lolasana in Sanskrit, is an arm-balancing pose. Begin in a seated position. Cross your shins and hinge forward. Place the left sole of your foot beneath your right buttock and the right sole of your foot beneath your left buttock so that your right shin is in front of your left calf. Place your palms on the ground slightly in front of your hips, engage your core and lift up. Keep your thighs close to your chest, straighten your arms and point your toes.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/pendant.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'strength')
      }, 
      { 
        name: 'Pigeon', 
        description: 'Pigeon pose, or Kapotasana in Sanskrit, is an advanced suppine stretching pose. The body is in an arched supine position with the hips and the ribcage lifted, the knees and the elbows are bent, the forearms and the shins are supporting the weight of the body and the crown of the head is softly resting on the earth. The palms are either resting on the feet or are hooked around the heels (depending on flexibility). The weight of the body is distributed equally between the forearms and the shins as the pelvis presses up and the ribcage lifts. The tailbone lengthens toward the knees and the sternum lifts up in the opposite direction creating a gentle arch in the back of the body. The gaze is out in front or down to the earth, depending on flexibility.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/pigeon.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'kneeling' || t.name === 'stretch-arms' || t.name === 'stretch-core' || t.name === 'stretch-legs' || t.name === 'supine')
      }, 
      { 
        name: 'Pigeon (Flying)', 
        description: 'Flying pigeon pose, or Eka Pada Galavasana in Sanskrit, is an arm-balancing pose. Begin in tree with arms up pose, standing on one leg. Release the foot from the inner thigh and place the ankle above the opposite knee. Bend the standing knee and fold forward, bringing the palms to the floor. Bend the elbows to about 90 degrees and hook the toes of the foot on the opposite upper arm. Bring the weight of the body forward as the standing foot comes off. Start to straighten the leg behind.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/pigeon_flying_L.png',
        tags: newTags.filter(t => t.name === 'arm-balance' || t.name === 'core' || t.name === 'strength' || t.name === 'stretch-hips')
      },
      { 
        name: 'Pigeon (Half)', 
        description: 'Half pigeon pose, or Ardha Kapotasana in Sanskrit, is a kneeling lunge-like posture. From a lounging position, the hips are parallel and squared to the earth with the front knee bent in a 90-degree angle and flat on the earth. The front foot rests close to the groin. The back leg is extended with the knee and the back foot squared, parallel and pressed firmly into the earth. The ribcage is lifted. The heart is open. Fingers rest on the earth by the side body. The gaze is forward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/pigeon_half_L.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'core' || t.name === 'hip-opener')
      },
      { 
        name: 'Plank', 
        description: 'Plank pose, or Phalakasana in Sanskrit, is an arm-supported pose. The body is parallel to the earth. The weight of the body is supported by straight arms and active toes. The abdomen is pulled up toward the spine and the pelvis is tucked in. The neck is a natural extension of the spine and the chin is slightly tucked. The palms are flat and the elbows are close to the side body. The joints are stacked with the wrists, elbows and shoulders in a straight line perpendicular to the earth. The gaze follows the spine and the eyes are focused down.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/plank.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'core' || t.name === 'strength')
      },
      { 
        name: 'Plank (Reversed)', 
        description: 'Reversed plank pose, or Purvottanasana in Sanskrit, is a supine arm-supported pose. From a seated position place the hands on the floor about one foot behind the hips with the fingertips pointed forward toward the hips. On an inhale press through the hands and feet to lift the hips as high as possible. Keep the inner line of the feet together and seal them into the mat as much as possible. Relax the head back and gaze at the tip of your nose.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/plank_upward.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'core' || t.name === 'strength' || t.name === 'supine')
      },
      { 
        name: 'Plow', 
        description: 'Plow pose, or Halasana in Sanskrit, is a supine arm-supported pose. From a supine position, the upper back rests on the earth with the hips and legs revolved back over the torso above and beyond the head toward the earth. The torso is perpendicular to the earth. The legs are fully extended with no bend at the knees as the toes reach for the earth. The hands are either supporting the lower back or extended behind the back on the earth with extended elbows and fingers interlaced (as flexibility allows), opening the shoulders. The neck is straight. The chin tucked. Do not look to the side as this may injure the neck. The is gaze inward.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/plow.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'core' || t.name === 'stretch-back' || t.name === 'stretch-legs' || t.name === 'supine')
      },
      { 
        name: 'Push Up (Low)', 
        description: 'Low push up pose, or Chaturanga Dandasana in Sanskrit, is a prone, arm-supported pose. From a prone position, the weight of the body is supported on the hands and the toes. The body is approximately 5 inches above and parallel to the earth. The abdomen is pulled up toward the spine. The pelvis is tucked. The palms are flat. The elbows are close to the side body and bent in a 90-degree angle and inline with the wrists. The toes are rooted into the earth as the heels push back. The gaze is down.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/four_limbed_staff.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'core' || t.name === 'prone' || t.name === 'strength')
      },
      { 
        name: 'Pyramid', 
        description: 'Pyramid pose, or Parshvottanasana in Sanskrit, is a standing pose. From triangle pose, clasp your hands behind your back and hinge your torso forward at the crease of your hip joint and fold your chest over your front thigh. Continue squaring your hips forward, gaze is down.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/pyramid_prayer_L.png',
        tags: newTags.filter(t => t.name === 'inversion' || t.name === 'standing' || t.name === 'stretch-back' || t.name === 'stretch-legs')
      },
      { 
        name: 'Rabbit', 
        description: 'Rabbit pose, or Shashankasana in Sanskrit, is a kneeling restorative pose. From child\'s pose, rest the torso onto the thighs and the forehead onto the earth. Walk the knees up to meet the forehead, shifting some weight to the crown of the head. Find the maximum comfortable neck stretch and then reach back and grip the base of the feet (use a strap if necessary). To increase the stretch and come into the full expression of the pose, gradually lift or elevate your hips. Be sure to keep your forehead as close as possible to your knees and the topmost part of your skull (crown of the head) on the earth. Contract your abdominal muscles and gaze at your ankles.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/rabbit.png',
        tags: newTags.filter(t => t.name === 'kneeling' || t.name === 'restorative' || t.name === 'stretch-back')
      },
      { 
        name: 'Rejuvination', 
        description: 'Rejuvination pose, or Supta Dandasana in Sanskrit, is a restful supine pose. From a supine position, with the back relaxed onto the earth, the legs extend toward the sky without any tension behind the knees. The arms rest by the side body and the palms open toward the sky in a receptive mode. Hold this position or gently sway the legs from side to side. The eyes are closed and the gaze is inward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/corpse_double_leg_raise.png',
        tags: newTags.filter(t => t.name === 'restorative' || t.name === 'supine')
      },
      { 
        name: 'Rooster', 
        description: 'Rooster pose, or Kukkutasana in Sanskrit, is an arm-balancing pose. Come into your lotus pose. Shift your hips back slightly and thread your hands and arms through your Lotus legs between your thighs and calves. Place your hands firmly on the ground with your fingers spread wide. Shift forward, engage your core, and straighten your arms to lift off.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/rooster.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'shoulders' || t.name === 'strength')
      },
      { 
        name: 'Sage Gheranda', 
        description: 'Sage Gheranda\'s pose, or Gherandasana in Sanskrit, is an advanced prone pose. Begin in bow pose. Rotate the knuckles of one hand so they face forward and the elbow is towards the sky. Bend the knee as much as possible bringing the knee and sole of the foot as close to the ground as possible. Extend the opposite leg straight into the sky. Lift the chest and take your gaze upwards. Repeat on the opposite side.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/gheranda_i_L.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'prone' || t.name === 'strength' || t.name === 'stretch-core' || t.name === 'stretch-legs')
      },
      { 
        name: 'Sage Marichi\'s', 
        description: 'Sage Marichi\'s pose, or Marichyasana A in Sanskrit, is a seated forward-bend pose. Begin in a seated position. Bend one knee in toward your chest and place your foot on the floor, with your heel as close to the same side sitting bone as possible. Your inner thigh and torso should be close. Keep the opposite leg extended and rotated slightly inward by grounding the head of your thighbone into the floor. Flex the foot of your activated, extended leg. Extend the arm of your same side bent knee high into the sky and then begin to reach it forward. As you reach your arm forward, lengthen your torso at the same time and snuggle your shin closer to your armpit. Flip your wrist, thumb side down, then sweep your forearm around the outside of your bent knee along your shin. Try to bring it around to your thigh or further. Then sweep your opposite arm around behind your back to catch opposite fingertips, or try to catch your wrist. Extend your torso forward from the groins, keeping your lower belly long. Lower your front torso as closely as possible to your extended leg. Be sure your shoulders don\'t scrunch up into your ears; draw your shoulders blades actively down your back. Option to lift your torso back up to extend through your twist.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/marichi_i_traditional_R.png',
        tags: newTags.filter(t => t.name === 'forward-bend' || t.name === 'seated' || t.name === 'stretch-arms' || t.name === 'stretch-back' || t.name === 'stretch-core' || t.name === 'stretch-legs')
      },
      { 
        name: 'Sage Marichi\'s Two', 
        description: 'Sage Marichi\'s second pose, or Marichyasana B in Sanskrit, is a seated forward-bend pose. Begin in a seated position. Bring one leg into half lotus pose or bend your knee so the sole of your foot is close to the opposite inner thigh. Bend your opposite knee in as if you were taking Sage Marichi\'s pose. Extend the arm (of your same side planted foot) high into the sky and then begin to reach it forward. As you reach your arm forward, lengthen your torso at the same time and snuggle your shin closer to your armpit. Flip your wrist, thumb side down, then sweep your forearm around the outside of your bent knee along your shin. Try to bring it around to your thigh or further. Then sweep your opposite arm around behind your back to catch opposite fingertips, or try to catch your wrist. Extend your torso forward from the groins, keeping your lower belly long. Lower your front torso forward toward your knee that is in half lotus pose. Be sure your shoulders don\'t scrunch up into your ears; draw your shoulders blades actively down your back. Option to lift your torso back up to extend through your twist.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/marichi_ii_traditional_R.png',
        tags: newTags.filter(t => t.name === 'forward-bend' || t.name === 'seated' || t.name === 'stretch-arms' || t.name === 'stretch-back' || t.name === 'stretch-core')
      },
      { 
        name: 'Sage Marichi\'s Three', 
        description: 'Sage Marichi\'s third pose, or Marichyasana C in Sanskrit, is a seated stretch pose. Begin in a seated position. Bend one knee in toward your chest and place your foot on the floor, with your heel as close to the same side sitting bone as possible. Your inner thigh and torso should be close. Keep the opposite leg extended and rotated slightly inward by grounding the head of your thighbone into the floor. Flex the foot of your activated, extended leg. Extend the arm of your same side extended leg high into the sky and begin to twist it to the outside of your bent knee. Use your opposite hand as leverage to twist deeper. Hook your elbow to the outside of your thigh and gaze over your back shoulder. If you want to extend your twist deeper, wrap your arm around the shin of your bent knee and sweep your opposite arm around to meet it. Catch opposite fingertips or the wrist. Keep a long spine.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/marichi_iii_traditional_R.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'stretch-arms' || t.name === 'stretch-back' || t.name === 'stretch-core')
      },
      { 
        name: 'Sage Marichi\'s Three', 
        description: 'Sage Marichi\'s third pose, or Marichyasana C in Sanskrit, is a seated stretch pose. Begin in a seated position. Bend one knee in toward your chest and place your foot on the floor, with your heel as close to the same side sitting bone as possible. Your inner thigh and torso should be close. Keep the opposite leg extended and rotated slightly inward by grounding the head of your thighbone into the floor. Flex the foot of your activated, extended leg. Extend the arm of your same side extended leg high into the sky and begin to twist it to the outside of your bent knee. Use your opposite hand as leverage to twist deeper. Hook your elbow to the outside of your thigh and gaze over your back shoulder. If you want to extend your twist deeper, wrap your arm around the shin of your bent knee and sweep your opposite arm around to meet it. Catch opposite fingertips or the wrist. Keep a long spine.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/marichi_iii_traditional_R.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'stretch-arms' || t.name === 'stretch-back' || t.name === 'stretch-core')
      },
      { 
        name: 'Sage Marichi\'s Four', 
        description: 'Sage Marichi\'s fourth pose, or Marichyasana D in Sanskrit, is a seated stretch pose. Begin in a seated position. Bring one leg into half lotus pose or bend your knee so the sole of your foot is close to the opposite inner thigh. Bend your opposite knee in as if you were taking Sage Marichi\'s pose, foot on the floor, heel close to your sit bone. Extend your arm (same side of your Lotus leg) high into the sky and begin to twist it to the outside of your bent knee. Use your opposite hand as leverage to twist deeper. Hook your elbow to the outside of your thigh and gaze over your back shoulder. If you want to extend your twist deeper, wrap your arm around the shin of your bent knee and sweep your opposite arm around to meet it. Catch opposite fingertips or the wrist. Keep a long spine.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/marichi_iv_traditional_R.png',
        tags: newTags.filter(t => t.name === 'hip-opener' || t.name === 'seated' || t.name === 'stretch-arms' || t.name === 'stretch-back' || t.name === 'stretch-core')
      },
      { 
        name: 'Sage Visvamitra\'s', 
        description: 'Sage Visvamitra\'s pose, or Vishvamitrasana in Sanskrit, is a balanced lunged pose. Begin in lizard pose with arms straightened and place your inside shoulder underneath your front thigh. Curl up your back toes and pivot your foot down as if in a Warrior pose. Ground the palm that is rooted under your front thigh, walk your front foot slightly to the opposite site to get the shoulder deep under your thigh. Begin to shift your weight back slightly. Bend your knee slightly to lift your foot off the ground and then straighten your leg. Ground down firmly to the outer edge of your back foot and your front palm. Roll your chest toward the sky and allow your gaze to follow.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/visvamitra_full_L.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'balance' || t.name === 'strength' || t.name === 'stretch-legs' || t.name === 'stretch-side')
      },
      { 
        name: 'Scale', 
        description: 'Scale pose, or Tolasana in Sanskrit, is an arm-balanced pose. Begin in lotus pose and place your palms on the floor beside your hips. Spread your fingers wide and push your hands against the floor, contract your abdominal muscles, and lift your legs and glutes away from the floor.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/lotus_elevated.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'strength')
      },
      { 
        name: 'Scorpion', 
        description: 'Scorpion pose, or Vrischikasana in Sanskrit, is an arm-balanced pose. From forearm balance pose the knees are bent and the feet are lowered toward the head as the crown of the head lifts and the upper thoracic reaches through to the front. To maintain balance the ribs move back and shoulders lower back and away from the ears as the forearms and palms push into the earth. The knees may separate, but keep the toes together. The gaze is forward or up depending on your flexibility.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/scorpion.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'core' || t.name === 'shoulders' || t.name === 'strength' || t.name === 'stretch-core')
      },
      { 
        name: 'Shoulder Pressing', 
        description: 'Shoulder pressing pose, or Bhujapidasana in Sanskrit, is an arm-balanced pose. Come into garland pose. Take your arms through your legs and place your palms flat on the floor behind your ankles. You may need to slightly lift up your hips to get there. Fingers face forward. Work your upper arm as high up under your knees as possible. Bend your elbows to create a shelf. Hinge forward onto your palms until your feet begin to lift off. Press firmly into the earth as you play with lifting one foot, then the other. If available, lift both feet and cross your ankles.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/scale_forward.png',
        tags: newTags.filter(t => t.name === 'arm-balancing' || t.name === 'hip-opener' || t.name === 'core' || t.name === 'strength')
      },
      { 
        name: 'Shoulder Stand (Supported)', 
        description: 'Supported shoulder stand pose, or Salamba Sarvangasana in Sanskrit, is an arm-supported inversion pose. From a supine position, the upper back is resting on the earth with the hips straight up toward the sky. The torso is perpendicular to the earth. The legs are fully extended and the toes are active. The hands are either supporting the lower back or extended up by the side body in matchstick. The weight rests on the center of the back of your skull and the neck maintains its natural curvature. The chest reaches towards the chin and the gaze is inward or towards the toes.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/shoulderstand_supported.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'core' || t.name === 'inversion' || t.name === 'strength')
      },
      { 
        name: 'Side Angle (Extended)', 
        description: 'Extended side angle pose, or Utthita Parshvakonasana in Sanskrit, is a forward leaning pose. From warrior two pose, engage your back thigh, anchor your back heel to the ground and maintain a 90 degree bend of your front knee. Keep your heart open and hinge forward towards your bent knee. Place your bottom palm on the inside or outside of your front foot. Extend your top arm up and over your head and bring your bicep by your ear. Take your eye gaze towards your top hand and rotate your chest and ribcage up towards the sky.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/warrior_ii_forward_arm_forward_L.png',
        tags: newTags.filter(t => t.name === 'forward-bend' || t.name === 'standing' || t.name === 'stretch-arms' || t.name === 'stretch-legs' || t.name === 'stretch-side')
      },
      { 
        name: 'Side Lunge', 
        description: 'Side lunge pose, or Skandasana in Sanskrit, is a standing, side leaning pose. Shift your weight to one side and at the same time bend your knee. You may need to pivot the toes of your bent knee outward. Keep your opposite leg straight and flex your foot so that your toes leave the floor and you are resting on your heel. Drop your hands to the floor for support or bring your hands to prayer.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/side_lunge_L.png',
        tags: newTags.filter(t => t.name === 'hip-opener' || t.name === 'standing' || t.name === 'stretch-legs')
      },
      { 
        name: 'Side Plank', 
        description: 'Side plank pose, or Vasishthasana in Sanskrit, is an arm-supported, side leaning pose. From an arm balance position the weight of the body is supported on one side and distributed equally between the bottom arm and foot while the other (top) arm lifts with fingers spread wide and the other (top) foot stacks on top. The grounded (bottom) foot is flat and gripping the earth from the outside edge of the foot. If flexibility of the foot is limited then instead of gripping the earth with a flat foot, the weight of the body is balanced on the side edge of the foot that is flexed instead of flat. The arm supporting the weight of the body and the grounded foot actively press into the floor as the shoulder blades firm against the back and then widen away from the spine drawing toward the tailbone. Bandhas are engaged to maintain balance and stability. The crown of the head reaches away from the neck and the gaze is up toward the hand.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/plank_side_R.png',
        tags: newTags.filter(t => t.name === 'balance' || t.name === 'arm-support' || t.name === 'core')
      },
      { 
        name: 'Sleeping Yogi', 
        description: 'Sleeping yogi pose, or Yoga Nidrasana in Sanskrit, is an arm-supported, side leaning pose. Begin in corpse pose. Bring both legs in and find an external rotation of the hips similar to happy baby pose. Work one leg behind the head bringing your arm through and then the other. Cross your ankles. Press your head downward into the ankles, lift your chest through and press your shoulders downward into your calves. Reach forward with your arms towards your sacrum and if possible, interlace your fingers.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/yogic_sleep.png',
        tags: newTags.filter(t => t.name === 'restorative' || t.name === 'stretch-back' || t.name === 'stretch-legs' || t.name === 'supine')
      },
      { 
        name: 'Snake', 
        description: 'Snake pose, or Sarpasana in Sanskrit, is a prone pose. From a prone position on your belly, bring your forehead and chin to center. Take a chest expansion and interlace your fingers at the small of your back. Inhale, lift your chest as high as you can off the floor and draw your interlaced fingers upward and back. The legs stay engaged, thighs connected, big toes touching. The neck is a natural extension of your spine.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/snake.png',
        tags: newTags.filter(t => t.name === 'prone' || t.name === 'strength' || t.name === 'stretch-core')
      },
      { 
        name: 'Sphinx', 
        description: 'Sphinx pose, or Salamba Bhujangasana in Sanskrit, is a prone pose. From a prone position with the pelvic bowl is firmly contracted interiorly toward the center line of the body while the pubis is tucked under. The legs are extended back and the tops of the feet are flat. The palms are flat and the elbows are on the mat, stacked right below the shoulders. On an inhalation, lift the sternum and extend the neck away from shoulders with the elbows, palms and pelvic bone firmly attached to the mat.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/sphinx.png',
        tags: newTags.filter(t => t.name === 'prone' || t.name === 'stretch-core')
      },
      { 
        name: 'Spinal Twist (Supine)', 
        description: 'Supine spinal twist pose, or Supta Matsyendrasana in Sanskrit, is a supine pose. From a supine position, bend one knee and cross it outside of the opposite foot. Use your hand to put slight pressure on the bent knee to push down toward the floor. Keep both shoulders squared and rooted to the earth. Extend the opposite hand and gaze toward the hand.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/supine_spinal_twist_L.png',
        tags: newTags.filter(t => t.name === 'restorative' || t.name === 'stretch-back' || t.name === 'stretch-hips' || t.name === 'supine')
      },
      { 
        name: 'Splits (Front)', 
        description: 'Front splits pose, or Hanumanasana in Sanskrit, is a seated stretching pose. The hips are parallel and squared to the earth with one leg extended forward. The opposite leg extended back with the knee and foot squared to the earth. The inner thighs scissor toward each other. The hands are by the side body or at the heart center in Anjali Mudra (Salutation Seal) or stretched straight up toward the sky. The ribcage is lifted. The heart is open. The gaze is forward.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/splits_front_L.png',
        tags: newTags.filter(t => t.name === 'seated' || t.name === 'stretch-legs')
      },
      { 
        name: 'Splits (Standing)', 
        description: 'Standing splits pose, or Urdhva Prasarita Eka Padasana in Sanskrit, is a standing stretching pose. From standing forward bend, lift your gaze and find a focal point on the ground in front of you. Walk your fingers out slightly in front of you. Shift your weight to one foot and lift your opposite leg up toward the sky. Focus on keeping your chest connected to the thigh of your grounded leg, even if you need to take a slight bend in your knee. The hip of your lifted leg should be squared, just like your grounded leg. Keep the hip bone of your lifted leg pointed downward and your toes rotated inward toward the midline of your body.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/splits_standing_L.png',
        tags: newTags.filter(t => t.name === 'balance' || t.name === 'standing' || t.name === 'strength' || t.name === 'stretch-legs')
      },
      { 
        name: 'Splits (Wide)', 
        description: 'Wide splits pose, or Samakonasana in Sanskrit, is a seated stretching pose. From a wide stance the legs are open and extended sideways to your degree of flexibility. The outer edges of the feet are rotated and gripping toward the earth. The weight of the body is supported by the arms. The palms are rooted into the earth with the fingers pointing toward the body. There should be no excess weight on the knee or ankle joints as you lower down to your degree of flexibility. The gaze is down and slightly forward.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/splits_wide.png',
        tags: newTags.filter(t => t.name === 'hip-opener' || t.name === 'seated' || t.name === 'stretch-legs')
      },
      { 
        name: 'Star', 
        description: 'Star pose, or Utthita Tadasana in Sanskrit, is a poweful standing pose. Begin standing in mountain pose. Step your feet apart wider than your hips, toes turned out slightly. Press into all four points of your feet and engage your legs. Tuck your tailbone slightly by bringing your pelvis to neutral. Reach your arms out to the side and energize your arms. Engage the back of your shoulders and broaden your collarbone.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/star_L.png',
        tags: newTags.filter(t => t.name === 'standing' || t.name === 'strength')
      },
      { 
        name: 'Straddle (Supine)', 
        description: 'Supine straddle pose, or Supta Samakonasana in Sanskrit, is a supine stretch pose. Begin in happy baby pose and slowly extend both legs outward. Option to release your hands and allow gravity to take place. Keep length in the spine and your head and tailbone rooted.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/supine_straddle.png',
        tags: newTags.filter(t => t.name === 'hip-opener' || t.name === 'restorative' || t.name === 'supine')
      },
      { 
        name: 'Table', 
        description: 'Table pose, or Chakravakasana in Sanskrit, is a neutral kneeling posture. From a kneeling position, the knees and arms form a box with the spine and neck in a neutral position. The hips and shoulders are squared to the earth and the palms are rooted with the weight of the body equally distributed between the heel of the hands and the top of the knees. The joints are stacked with the wrists, elbows and shoulders in a straight line. The gaze is down.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/box_neutral.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'kneeling' || t.name === 'core' || t.name === 'warm-up')
      }, 
      { 
        name: 'Thunderbolt', 
        description: 'Thunderbolt pose, or Vajrasana in Sanskrit, is a kneeling posture. Begin kneeling on the floor with your hips over your knees. Place your inner knees together and your thighs perpendicular to the floor. Un-tuck your toes and press the tops of your feet into the ground. Sit on your heels by resting your glutes on the soles of your feet. Keep your feet directly in line with your shins. Your feet and thighs should be touching throughout the pose. Sit up straight and draw your shoulder blades firmly against your back ribs. Widen across your collarbone and drop your shoulders away from your ears. Sit up tall and lengthen your tailbone toward the floor. Allow your arms to relax and rest your palms on your thighs. Soften your gaze.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/thunderbolt.png',
        tags: newTags.filter(t => t.name === 'kneeling' || t.name === 'restorative' || t.name === 'seated')
      },
      { 
        name: 'Thunderbolt (Little)', 
        description: 'Little thunderbolt pose, or Laghu Vajrasana in Sanskrit, is a kneeling stretch pose. Come into your camel pose and drop to your pigeon pose, all the way to your forearms and the crown of your head. Distribute the weight equally between your forearms and shins. Press your pelvis and ribcage upward. Walk your hands as far forward as possible to catch your ankles, calves or the front of your thighs.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/little_thunderbolt.png',
        tags: newTags.filter(t => t.name === 'kneeling' || t.name === 'stretch-core' || t.name === 'stretch-legs')
      },
      { 
        name: 'Tiger', 
        description: 'Tiger pose, or Vyaghrasana in Sanskrit, is a kneeling, arm-balancing pose. Come into one legged table pose. Bend your floating knee and reach your heel upward and toward your head. Keep your hips at the same level. Find a gentle backbend and draw your navel towards your spine. Palms flat, arms straight and shoulders over wrists.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/tiger_L.png',
        tags: newTags.filter(t => t.name === 'hip-opener' || t.name === 'kneeling' || t.name === 'strength')
      },
      { 
        name: 'Toe Stand', 
        description: 'Toe stand pose, or Padangushthasana in Sanskrit, is a seated, balancing pose. Begin in standing half lotus pose. The sole of your foot should be facing the sky, and the top of your foot should rest on your leg or hip. Allow your bent knee to drop down. Hinge forward at the hips, strongly engaging your abdominal muscles to aid your balance. Keeping your standing leg straight, release your hands and place your fingertips on the floor in front of you or alongside of you. Bend your standing leg and bring your hips close to the floor. The thigh of your standing leg should come parallel to the floor, and all of your weight should be balanced across the ball of your standing foot. Rest your glute on the heel of your standing foot. Keeping your abdominals engaged, try to lift your fingers off the ground and bring your hands in prayer or half prayer.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/toe_stand_L.png',
        tags: newTags.filter(t => t.name === 'core' || t.name === 'seated' || t.name === 'strength')
      },
      { 
        name: 'Tortoise', 
        description: 'Tortoise pose, or Kurmasana in Sanskrit, is a prone, forward-bending pose. Begin in a seated position with your legs straight in front of you and your hands on the floor alongside your hips. Press your thighs into the floor, flex your feet, and lift your chest. Bring your legs to the edges of the mat, with your knees as wide as your shoulders. Bend your knees, and keeping your feet flexed, bring them closer to your hips. Extend your chest and arms forward and down between your legs. Bend your legs even more, so that you can put your shoulders one by one under your knees. Once there, stretch your arms out to the sides. Roll your thighs inward and extend your inner heels, without creating tension in the feet. Spread the front of your chest and collarbones forward and down with the help of the pressure of your thighs on the shoulders or upper arms. Push your inner heels down and forward to stretch and straighten your legs. Your inner thighs should remain in contact with your side ribs.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/supine_tortoise.png',
        tags: newTags.filter(t => t.name === 'hip-opener' || t.name === 'seated' || t.name === 'stretch-back' || t.name === 'stretch-legs')
      },
      { 
        name: 'Tree', 
        description: 'Tree pose, or Vrikshasana in Sanskrit, is a standing balance pose. From a standing position, one foot is rooted into the earth with the opposite heel rooted into the inner thigh with the toes pointing toward the earth. The pelvis and the chin are tucked in. The hands come together at the heart in prayer position. The gaze is forward.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/tree_prayer_R.png',
        tags: newTags.filter(t => t.name === 'balance' || t.name === 'standing' || t.name === 'strength')
      },
      { 
        name: 'Triangle', 
        description: 'Triangle pose, or Trikonasana in Sanskrit, is a standing balance pose. From a standing position, the legs are straight and separated into a wide stance. The feet are aligned and flat on the earth with the back foot in a 60-degree angle toward the front. The inner thighs are rotated externally away from each other. The pelvis is tucked and the ribcage is lifted. One arm extends up toward the sky as the other reaches down to the earth. Both arms are aligned with the shoulders in a straight line. The fingers reach out as the shoulder blades squeeze together. The gaze is toward the front.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/triangle_forward_L.png',
        tags: newTags.filter(t => t.name === 'balance' || t.name === 'standing' || t.name === 'stretch-legs' || t.name === 'stretch-side')
      },
      { 
        name: 'Triangle (Revolved)', 
        description: 'Revolved triangle pose, or Parivritta Trikonasana in Sanskrit, is a standing balance pose. From a standing position the weight of the body is distributed equally between the front and back leg. The legs are in a wide stance, parallel and scissor toward each other. The back foot is at a 45 to 60 degree angle and the front and back heels are aligned. The forward thigh is turned outward so that the center of the kneecap is in line with the center of the ankle. The torso opens toward the sky while the hips are squared as much as possible. The top hand extends up while the bottom hand is either on the earth (inside or outside the foot) or, if flexibility is limited, on a block positioned against the inner sole of the foot. From the center of the back, between the shoulder blades, the arms press away from the torso. Beginning students should keep their head in a neutral position and look forward or turn the gaze toward the earth. More experienced students can turn the head and gaze up at the top thumb as a Drishti point.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/triangle_revolved_L.png',
        tags: newTags.filter(t => t.name === 'balance' || t.name === 'standing' || t.name === 'stretch-legs' || t.name === 'stretch-side')
      },
      { 
        name: 'Upward-Facing Dog', 
        description: 'Upward-facing dog pose, or Urdhva Mukha Shvanasana in Sanskrit, is an arm-supported prone pose. The body is in a prone position parallel to the earth. The weight of the body is supported equally by the straight arms and the tops of the feet which press firmly into the earth. The shoulders are rotated back and down. The ribcage is lifted and pulled through to the front in a slight upper thoracic backbend. The joints are stacked with the wrists, elbows and shoulders in a straight-line. The neck is a natural extension of the spine and the chin is slightly tucked. The abdomen is pulled up toward the spine. The palms are flat and the elbows are close to the side body. The gaze is forward.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/upward_dog.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'chest-opener' || t.name === 'prone' || t.name === 'stretch-core' || t.name === 'stretch-side')
      },
      { 
        name: 'Warrior One', 
        description: 'Warrior one pose, or Virabhadrasana A in Sanskrit, is a standing strength pose. From a standing position, the legs are in a wide stance with the feet aligned and flat on the earth. The back foot is in a 60-degree angle toward the front. The hips are squared. The inner thighs are rotated toward each other. The front knee is bent in a 90-degree angle directly above the ankle. The arms extend up to the sky with the biceps by the ears. The hands can be together or separated and facing each other with the fingers spread wide. The ribcage is lifted and the pelvis tucked. The gaze is forward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/warrior_i_L.png',
        tags: newTags.filter(t => t.name === 'balance' || t.name === 'chest-opener' || t.name === 'standing' || t.name === 'strength' || t.name === 'stretch-core' || t.name === 'stretch-legs')
      },
      { 
        name: 'Warrior Two', 
        description: 'Warrior two pose, or Virabhadrasana B in Sanskrit, is a standing strength pose. From a standing position, the legs are separated into a wide stance. The front knee is bent in a 90-degree angle directly above the ankle. The back leg is extended and straight with the outside edge of the back foot gripping the earth in a 60-degree angle toward the front. The inner thighs are externally rotated away from each other. The pelvis is tucked. The ribcage is lifted. The arms are extended out to the sides and are aligned with the shoulders in a straight line with the fingers reaching out as the shoulder blades squeeze together. The gaze is toward the front fingers.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/warrior_ii_L.png',
        tags: newTags.filter(t => t.name === 'balance' || t.name === 'chest-opener' || t.name === 'standing' || t.name === 'strength' || t.name === 'stretch-core' || t.name === 'stretch-legs')
      },
      { 
        name: 'Warrior Three', 
        description: 'Warrior three pose, or Virabhadrasana C in Sanskrit, is a standing strength and balance pose. From a standing position, one leg is rooted and perpendicular to the earth while the other leg is raised, extended back and parallel to the earth. The head of the thighbone of the standing leg presses back toward the heel and is actively rooted into the earth. The arms and the extended leg lengthen in opposing directions with Bandhas engaged. The hips are squared and the tailbone presses firmly into the pelvis. The arms, torso, and extended raised leg should be positioned relatively parallel to the floor. The gaze is forward or down.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/warrior_iii_L.png',
        tags: newTags.filter(t => t.name === 'balance' || t.name === 'chest-opener' || t.name === 'standing' || t.name === 'strength' || t.name === 'stretch-core' || t.name === 'stretch-legs')
      },
      { 
        name: 'Wheel', 
        description: 'Wheel pose, or Urdhva Dhanurasana in Sanskrit, is an arm-supported backbend pose. Pressed up from a supine position, lying on your back, the palms are rooted into the earth with the fingers pointed toward the heels. The feet are grounded. The hips are pressed up. The thighs are rotated inward. The thoracic spine is arched creating a strong crescent arch along the spinal column. The gaze is forward.',
        difficulty: 3,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/wheel.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'chest-opener' || t.name === 'supine' || t.name === 'strength' || t.name === 'stretch-core')
      },
      { 
        name: 'Wide Legged Forward Bend', 
        description: 'Wide legged forward bend pose, or Prasarita Padottanasana in Sanskrit, is an arm-supported forward-bending pose. Begin standing in mountain pose. Step your feet apart wider than your hips, toes turned in, heels out slightly. Press into all four points of your feet and engage your legs. Tuck your tailbone slightly by bringing your pelvis to neutral. Place your hands to your hips and hinge forward to fold. Once you can no longer go further, drop your hands underneath your head and begin to walk your hands through your legs. Drop the crown of your head down and relax your neck. Continue to draw energy up your feet and tilt your hips up and forward slightly. Keep your weight forward so your hips and ankles stay in line.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/wide_legged_forward_bend_i_L.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'standing' || t.name === 'stretch-back' || t.name === 'stretch-legs')
      },
      { 
        name: 'Wild Thing', 
        description: 'Wild thing pose, or Chamatkarasana in Sanskrit, is an arm-supported side-stretching pose. From downward-facing dog pose, elevate one leg toward the sky and stack the corresponding hip over the other hip. Bring the upper heel as close to the buttocks as possible. The hips remain stacked; then bring the shoulders forward slowly over the hands. Replace the corresponding hand to the upraised leg with the other hand and flip yourself over and extend the top hand forward. The bottom foot is now facing toward the front of the mat and you remain on the ball of the top foot and the corresponding knee is bent. Continue to lift hips up toward the sky and continue reaching the free hand toward the front of the room and slightly downwards. Allow the head to curl back.',
        difficulty: 2,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/wild_thing_R.png',
        tags: newTags.filter(t => t.name === 'arm-support' || t.name === 'chest-opener' || t.name === 'stretch-side' || t.name === 'stretch-legs')
      },
      { 
        name: 'Wind Removing', 
        description: 'Wind removing pose, or Pavanamuktasana in Sanskrit, is an supine resting pose. From a supine position, lying on your back, the knees are bent and pulled into the chest. The arms are wrapped around the knees. The gaze is inward.',
        difficulty: 1,
        time: 15,
        imageURL: 'https://pocketyoga.com/assets/images/full/turtle.png',
        tags: newTags.filter(t => t.name === 'restorative' || t.name === 'stretch-back' || t.name === 'supine' || t.name === 'warm-up')
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