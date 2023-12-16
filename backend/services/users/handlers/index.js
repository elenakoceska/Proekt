// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   fullname: String,
//   email: String,
//   password: String,
//   role: String,
// });

// const User = mongoose.model("users", userSchema);

const {addNewUser, getUserByRoleAdmin} = require ("../../../pkg/users");

const create = async (req, res) => {
  try {
    await addNewUser(req.body); 
    return res.status(201).send(req.body); 
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};


const getUserByRole = async (req, res) => {
  try {
    const user = await getUserByRoleAdmin(req.params.email); 
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getById(req.params.id);
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await getByEmail(req.params.email); 
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};


const setNewPassword = async (id, password) => {
};


const getAllUsers = async (req, res) => {
  try {
    const users = await findUsers();
    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    await update(req.params.id, req.body);
    return res.status(204).send(""); 
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const removeUser = async (req, res) => {
  try {
    await remove(req.params.id);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  create,
  getUserByRole,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  removeUser,
};
