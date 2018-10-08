// Dependencies =======================
// require
const express = require("express");
const router = express.Router();

// model
const Guest = require("../models/guests.js");

// Routes =============================
// index
router.get("/", async (req, res) => {
  const allGuests = await Guest.find();
  res.send(allGuests);
});

// create
router.post("/", async (req, res) => {
  try {
    const newGuest = await Guest.create(req.body);
    res.send(newGuest);
  } catch (err) {
    res.send(err.message);
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    for (let i = 0; i < req.body.img.length; i++) {
      if (req.body.img[i] === "") {
        req.body.img.splice(i, 1);
        i--;
      }
    }
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body);
    res.send(guest);
  } catch (err) {
    res.send(err.message);
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const guest = await Guest.findByIdAndRemove(req.params.id);
    res.send(guest);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
