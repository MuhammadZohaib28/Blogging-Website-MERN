import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

/********************************************************* REGISTER USERS *********************************************************/
const registerUser = async (req, res) => {
  // Grab the data from the request body
  const { email, password } = req.body;

  //   Check if the fields are not empty
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  //   Check if email already exists
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ error: "Email is already taken" });
  }

  // hash password
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ email, password: hashed });
    res.status(200).json({ email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/********************************************************* Login USERS *********************************************************/
const loginUser = async (req, res) => {
  res.send("Login User");
};

export { registerUser, loginUser };
