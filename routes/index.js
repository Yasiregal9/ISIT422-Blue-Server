
var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const UserPlant = require("../UserPlant");
const UpdatePlant = require("../UpdatePlant");
const dbURI = require("../cstring");
mongoose.set('useFindAndModify', false);
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established")
  },
  err => {
    console.log("Database connections error: ", err)
  }
)

// for this version, we will keep data on server in an array
userPlantArray =  [{plantUserName: "test"}];

router.get('/userplant', function(req, res) {
  userPlantArray.forEach(plant => {
    console.log(plant.plantUserName);
  });
  res.status(200).json(userPlantArray);
})

updatePlantArray =  [{updateComment: "asdf"}];

router.get('/updateplant', function(req, res) {
  updatePlantArray.forEach(plant => {
    console.log(plant.updateComment);
  });
  res.status(200).json(updatePlantArray);
})

// router.get('/heroes/:id', function(req, res) {
//   let found = false;
//     for(var i=0; i < heroArray.length; i++)
//     {
//       if( heroArray[i].id == req.params.id)
//       {
//         console.log(heroArray[i]);
//         found = true
//         res.status(200).json(heroArray[i]);
//       }
//     }
//     if(found === false){
//       res.status(500).send("no such hero");
//       }
//   });


//   router.put('/heroes/:id', function(req, res) {
//     var changedHero = req.body; 
//     let found = false;
//     for(var i=0; i < heroArray.length; i++)
//     {
//       if( heroArray[i].id == req.params.id)
//       {
//         heroArray[i] = changedHero;
//         found = true
//         res.status(200).json(heroArray[i]);
//       }
//     }
//     if(found === false){
//       res.status(500).send("no such hero");
//       }
//    });



// // delete is used to delete existing object using the user's app id field
// router.delete('/heroes/:id', function (req, res) {
//   let found = false;
//   for(var i=0; i < heroArray.length; i++)
//   {
//     if( heroArray[i].id == req.params.id)
//     {
//       console.log(heroArray[i]);
//       found = true
//       heroArray.splice(i,1);
//       res.status(200).json(heroArray[i]);
//     }
//   }
//   if(found === false){
//     res.status(500).send("no such hero");
//     }
// });

/* post a new plant  */
router.post('/userplant', function(req, res) {
  let receivedPlant = req.body;
  let newPlant = new UserPlant({
    plantID: uid(),
    plantUserID: receivedPlant.plantUserID,
    plantUserName: receivedPlant.plantUserName,
    plantLatinName: receivedPlant.plantLatinName,
    plantCommonName: receivedPlant.plantCommonName,
    plantSource: receivedPlant.plantSource,
    plantStartHeight: receivedPlant.plantStartHeight,
    plantCurrentHeight: receivedPlant.plantCurrentHeight,
    plantStartWidth: receivedPlant.plantStartWidth,
    plantCurrentWidth: receivedPlant.plantCurrentWidth,
    plantStartHealth: receivedPlant.plantStartHealth,
    plantCurrentHealth: receivedPlant.plantCurrentHealth
  });
  //newPlant = (req.body);
  //newPlant.id = uid();   // use code below to create unique id
  console.log("new id = " + newPlant.plantID);
  //userPlantArray.push(newPlant);
  newPlant.save();
  res.status(201).json(newPlant);
});

//update plant status
//need to get unique plant id
router.post('/updateplant', function(req, res) {
  let oldUpdate = req.body;
  console.log(oldUpdate.updateCurrentHeight);
  console.log(oldUpdate.updateCurrentWidth);
  let updatePlant = new UpdatePlant({
    updateDate: oldUpdate.updateDate,
    updateCurrentHeight: oldUpdate.updateCurrentHeight,
    updateCurrentWidth: oldUpdate.updateCurrentWidth,
    updateCurrentHealth: oldUpdate.updateCurrentHealth,
    updateComment: oldUpdate.updateComment
  });
  updatePlant.save();
  res.status(201).json(updatePlant);
});

module.exports = router;

//Create a unique ID using time + random
const uid = () =>
  String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, '');