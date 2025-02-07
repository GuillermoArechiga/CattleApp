import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../database/models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const resolvers = {
  Query: {
    users: async (_, __, { user }) => {
      if (!user) {
        throw new Error("Unauthorized");
      }
      return await User.find();
    },
    me: async (_, __, { user }) => {
      if (!user) {
        throw new Error("Unauthorized");
      }
      return await User.findById(user.id);
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
        throw new Error("Invalid credentials");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      };
    },
  },
};

export default resolvers;
