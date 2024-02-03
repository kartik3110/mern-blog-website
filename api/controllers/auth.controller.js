import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import ExpressError from "../utils/ExpressError.js";
const authController = {
  signUp: async (req, res, next) => {
    const { username, email, password } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      next(new ExpressError(400, "all fields must be non empty"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 12); // synchronous
    try {
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      res.json("successful signup");
    } catch (error) {
      next(new ExpressError(500, error.message));
    }
  },
};

export default authController;
