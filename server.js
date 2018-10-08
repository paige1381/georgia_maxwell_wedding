// Dependencies =======================
// require
const express = require("express"); // npm i express
const mongoose = require("mongoose"); // npm i mongoose
const morgan = require("morgan"); // npm i morgan
require("pretty-error").start(); // npm i pretty-error
const app = express();
const methodOverride = require("method-override"); // npm i method-override

// controllers
const invitesController = require("./controllers/invites.js");
const guestsController = require("./controllers/guests.js");

// Port ===============================
const PORT = process.env.PORT || 3000; // (remote || local)

// Database ===========================
// connect
const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/georgia_maxwell_wedding"; // locate mongo databases (remote || local)
mongoose.connect(
  mongoURI,
  { useMongoClient: true }
); // connect to location
mongoose.Promise = global.Promise; // setting the promise library to native

// errors
const db = mongoose.connection;
db.on("error", err => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

// Middleware =========================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(morgan("dev")); // logs request info in console

// Routes =============================
// controllers
app.use("/invites", invitesController);
app.use("/guests", guestsController);

// root
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Listen =============================
app.listen(PORT, console.log("listening on port", PORT));
