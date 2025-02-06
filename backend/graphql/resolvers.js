import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../database/models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Store this secret in an environment variable for security.

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
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      // Create a JWT token and send it back to the client
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      // Exclude password before sending user info back
      user.password = undefined;

      return {
        token,
        user, // Return the user details along with the token
      };
    },
  },
};

export default resolvers;
