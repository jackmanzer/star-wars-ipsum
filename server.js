const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/starwars-ipsum',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!!');
});

//import models 
const Character = require("./models/character");
const Planet = require("./models/planet");
const Species = require("./models/species");
const Vehicle = require("./models/vehicle");
const Weapon = require("./models/weapon");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});


// app.get("/vehicles", (req, res) => {
//   db.vehicles.find({}, (error, data) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.get("/characters", (req, res) => {
  Character.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

app.get("/planets", (req, res) => {
  Planet.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

app.get("/species", (req, res) => {
  Species.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

app.get("/vehicles", (req, res) => {
  Vehicle.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

app.get("/weapons", (req, res) => {
  Weapon.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, () => {
  console.log("App running on port 3000!");
});

