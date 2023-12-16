const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minlength: [8, "password must be at least 8 caracters long"]
    },
    role: {
       type: String,
       enum: ["user", "admin"]
   }
    
});

const User = mongoose.model('User', userSchema);

const addNewUser = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
};

const getUserByRoleAdmin = async(_id) => {
    return User.find({role : "admin", _id: id });
};


const getById = async (id) => {
    return await Account.findOne({ _id: id });
};
  
const getByEmail = async (email) => {
    return await User.findOne({ email: email });
};
  
const setNewPassword = async (id, password) => {
    return await User.updateOne({ _id: id }, { password: password });
};
  
const getAll = async () => {
    return await User.find({});
};
  
const update = async (id, newData) => {
    return await User.updateOne({ _id: id }, newData);
};
  
const remove = async (id) => {
    return await User.deleteOne({ _id: id });
};

module.exports = {
    addNewUser,
    getUserByRoleAdmin,
    getById,
    getByEmail,
    setNewPassword,
    getAll,
    update,
    remove,
};