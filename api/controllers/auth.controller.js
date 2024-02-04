import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import ExpressError from "../utils/ExpressError.js";
import jwt from "jsonwebtoken";
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

  signIn: async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password || username === "" || password === "") {
      return next(new ExpressError(400, "all fields must be non empty"));
    }
    try {
      const foundUser = await User.findOne({ username: username });
      if (!foundUser) {
        return next(new ExpressError(400, "User does not exist"));
      }
      const isValidPassword = bcryptjs.compareSync(
        password,
        foundUser.password
      );
      if (!isValidPassword) {
        return next(new ExpressError(400, "invalid credentials"));
      }
      //create a token
      const token = jwt.sign(
        { username: foundUser.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      // remove the password from the user object before sending it to the client for state management
      const { password: passwordAlias, ...rest } = foundUser._doc; // _doc is a mongoose property that contains the document object
      // send the token in a HTTP-only cookie
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } catch (err) {
      next(new ExpressError(500, err.message));
    }
  },
};

export default authController;
