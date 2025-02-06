import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Password hashing before saving the user
userSchema.pre("save", async function (next) {
  // Only hash the password if it's being set for the first time or modified
  if (!this.isModified("password")) return next();

  // Check if the password is already hashed (bcrypt hashes start with "$2a$")
  if (this.password.startsWith("$2a$")) {
    return next(); // Skip hashing if it's already hashed
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
