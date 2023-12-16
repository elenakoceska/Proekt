const bcrypt = require("bcryptjs");
const User = require("../../../pkg/users");
const jwt = require("jsonwebtoken");
const config = require("../../../pkg/config");

const {sendMail} = require ("../../../pkg/mailer")

const create = async (req, res) => {
  try {
    const {full_name, email, password, password2, role} = req.body;
    if (
      req.body.password.length === 0 ||
      req.body.password !== req.body.password2
    ) {
      return res.status(400).send("Bad request");
    }
    if(password !== password2) {
      return res.status(400).send("Passwords do not match")
    }
    
    const exist_user = await User.findOne(req.body.email);
    if (exist_user) {
      return res.status(409).send("Conflict, this user is already in use");
    }
    
    req.body.password = bcrypt.hashSync(req.body.password);
    
    let newUser = await User.create({
      full_name,
      email,
      password:hashedPassword,
      role,
    });
    await sendMail(email);
    return res.status(201).send(newUser);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const login = async (req, res) => {
  try {
    let user = await user.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(400).send("Bad request. Bad login credentials");
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).send("Bad request. Bad login credentials");
    }
    
    let payload = {
      full_name: user.full_name,
      id: user_id,
      email: user.email,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
    };


    if(user.role === "admin" || user.role === "administrator") {
      console.log(`You are logged as ${user.role}`);
      payload.role = user.role;
    }

    let token = jwt.sign(payload, config.get("security").jwt_secret);
    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const forgotPassword = (req, res) => {
  return res.send("ok");
};


const resetPassword = async (req, res) => {
  await validate(req.body, AccountReset);
  const { new_password, old_password, email } = req.body;

  const userAccount = await accounts.getByEmail(email);

  if (!bcrypt.compareSync(old_password, userAccount.password)) {
    return res.status(400).send("Incorrect password!");
  }

  const newPasswordHashed = bcrypt.hashSync(new_password);
  if (old_password === new_password) {
    return res.status(400).send("New password cannot be old password");
  }

  const userPassChanged = await accounts.setNewPassword(
    userAccount._id.toString(),
    newPasswordHashed
  );

  return res.status(200).send(userPassChanged);
};


// const validate = (req, res) => {
//   console.log(req.auth);
//   return res.status(200).send(req.auth);
// };

module.exports = {
  create,
  login,
  forgotPassword,
  resetPassword,
  //validate,
};
