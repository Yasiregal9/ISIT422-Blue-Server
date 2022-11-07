var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const UserPlant = require("../UserPlant");
const UpdatePlant = require("../UpdatePlant");
const User = require("../User");
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

//Get all userplants for all user
router.get('/userplant', function(req, res) {
  UserPlant.find({}, (err, userPlants) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(userPlants);
  });;
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
router.post('/updateplant', function(req, res) {
  let oldUpdate = req.body;

  //insert a new updatePlant into the updateplants collection
  let updatePlant = new UpdatePlant({
    updateID: uid(),
    plantID: oldUpdate.plantID,
    updateDate: oldUpdate.updateDate,
    updateCurrentHeight: oldUpdate.updateCurrentHeight,
    updateCurrentWidth: oldUpdate.updateCurrentWidth,
    updateCurrentHealth: oldUpdate.updateCurrentHealth,
    updateComment: oldUpdate.updateComment
  });
  updatePlant.save();

  //update an existing userPlant in the userplants collection
  UserPlant.findOne({plantID: updatePlant.plantID}, function (err, userPlant){
    if (err){
      console.log(err);
    } else {
      userPlant.plantCurrentHeight = updatePlant.updateCurrentHeight;
      userPlant.plantCurrentWidth = updatePlant.updateCurrentWidth;
      userPlant.plantCurrentHealth = updatePlant.updateCurrentHealth;
      userPlant.save();
    }
  });

  res.status(201).json(updatePlant);
});

//Create a unique ID using time + random
const uid = () =>
  String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, '');

/* post a new User and push to Mongo */
router.post('/newuser', function(req, res) {
  // should verify user name not already in DB
    let oneNewuser = new User(req.body);  
    console.log(req.body);
    console.log(oneNewuser);
    oneNewuser.save((err, userValue) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
      console.log(userValue);
      res.status(201).json(userValue);
      }
    });
  });
  
  
  /* using post to pass name - pw and return the object with _id if found */
  router.post('/loginUser', function(req, res) {
    let findName = req.body.userName;  
    let findpw = req.body.pw;  
    console.log(findName + " -- " + findpw);
    User.find(
      { userName: findName, pw: findpw },  
      { completed: true },   // ignore the value of the object's completed prop, just force it to true
      { new: false }, // if it does not find one, do not just make up a new one.
      (err, data) => {
        if (err) {
          res.status(500).send(err);
      }
      if(data[0] != null) {
        console.log("id found " + data); // mongo does not complain if not found!
        res.status(200).json(data[0]._id);
      }
      else {
        console.log("not found");
        var notfound = 0;
        res.status(200).json(notfound);
      }
      })
  });
  
  module.exports = router;