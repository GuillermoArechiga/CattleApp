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


      // Check if user exists
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      // If credentials are valid, generate a token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token };
    },
  },
};

export default resolvers;
