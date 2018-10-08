const mongoose = require("mongoose");

const guestSchema = mongoose.Schema(
  {
    guest: { type: String, required: true },
    attending: { type: String },
    primary_guest: { type: mongoose.Schema.Types.ObjectId, ref: "Invite" }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Guest", guestSchema);
