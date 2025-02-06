import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../database/models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
  },

  Mutation: {
    // Register a new user (create user and return user details)
    registerUser: async (_, { name, email, phone, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        phone,
        password: hashedPassword,
      });
      
      await newUser.save();

      return newUser;
    },

    loginUser: async (_, { email, password }) => {
      console.log("Trying to find user with email:", email); // Debugging line

      // Check if user exists
      const user = await User.findOne({ email });

      if (!user) {
        console.log("User not found:", email); // Debugging line
        throw new Error("Invalid credentials");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch);

      if (!isMatch) {
        console.log("Password mismatch for user:", email); // Debugging line
        throw new Error("Invalid credentials");
      }

      // If credentials are valid, generate a token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log("Generated token:", token); // Debugging line
      return { token };
    },
  },
};

export default resolvers;
