const mongoose = require("mongoose");

const inviteSchema = mongoose.Schema(
  {
    primary_guest: { type: String, required: true },
    email: { type: String }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Invite", inviteSchema);
