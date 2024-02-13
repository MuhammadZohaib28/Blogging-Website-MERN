import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
/********************************************************* JWT TOKEN *********************************************************/

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};

/********************************************************* REGISTER USERS *********************************************************/
const registerUser = async (req, res) => {
  // Grab the data from the request body
  const { email, password, fullname } = req.body;

  //   Check if the fields are not empty
  if (!email || !password || !fullname) {
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
    const user = await User.create({ email, password: hashed, fullname });
    // Creating the JSONWEBTOKEN
    const token = createToken(user._id);
    // Sending the Response
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/********************************************************* Login USERS *********************************************************/
const loginUser = async (req, res) => {
  // Grab the data from the request body
  const { email, password } = req.body;

  //   Check if the fields are not empty
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  //   Check if email already exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Incorrect Email" });
  }

  //   Check if password is correct
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Incorrect Password" });
  }

  try {
    // Creating the JSONWEBTOKEN
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser };
