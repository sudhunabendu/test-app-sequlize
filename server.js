const express = require("express");
const cors = require("cors");
const bodyParser=require("body-parser");
const app = express();
const dotenv = require('dotenv').config()
var path = require('path');

var corsOptions = {
    origin: "http://localhost:8081"
  };
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  

  app.use("/app-property", express.static(path.join(__dirname, "public")));

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  const db = require("./app/Models")
  const Role = db.role;

  db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
    // initial();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


  function initial() {
    Role.create({
      id: 1,
      name: "super-admin"
    });
   
    Role.create({
      id: 2,
      name: "admin"
    });
   
    Role.create({
      id: 3,
      name: "user"
    });
  }

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Aditya application." });
  });

  
  
// set port, listen for requests
const PORT = process.env.PORT || 8080;

require("./routes/auth.routes")(app);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}.`);
  });