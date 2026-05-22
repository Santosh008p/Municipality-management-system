import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const registerUser = async (req, res) => {
  //step 1: check igf the user with the same phone number already exists
  const userExists = await User.exists({ phone: req.body.phone })
  if (userExists) {
    return res.status(400).send('phone number already registered');
  }
  //step 2: hash the password
  req.body.password = await bcrypt.hash(req.body.password, 10)
  // step 3: create the user
  await User.create(req.body)
  res.send('users Created')
}

const loginUser = async (req, res) => {
  //step 1: check if the user exists
  const user = await User.findOne({ phone: req.body.phone})
  if (!user) {
    return res.status(400).send('phone number does not exist')
  }
  // step 2L check if password matches
  const isMatched = await bcrypt.compare(req.body.password, user.password);
  if (!isMatched) {
    return res.status(400).send('Invalid credentials')
  }
  const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  res.send({ message: 'Login successful', token });
}

export { registerUser, loginUser };