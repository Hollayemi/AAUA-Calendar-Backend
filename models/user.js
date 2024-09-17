const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  list: {
    type: Array,
    default: [ { type: Schema.Types.ObjectId} ],
    ref: "Event"
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
