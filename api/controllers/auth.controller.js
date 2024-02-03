import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
const authController = {
  signUp: async (req, res) => {
    const { username, email, password } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json("please fill all fields");
    }
    const hashedPassword = bcryptjs.hashSync(password, 12); // synchronous
    try {
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      res.json("successful signup");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

export default authController;
