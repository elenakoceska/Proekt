const express = require("express");
const {
    create,
    getUserByRole,
    getUserById,
    getUserByEmail,
    getAllUsers,
    updateUser,
    removeUser,
} = require("./handlers");


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.write("");
  res.end();
});

app.get("/users", getAllUsers);
app.get("/user/:email", getUserByRole);
app.get("/users/:id", getUserById);
app.get("/users/:email", getUserByEmail);
app.post("/users", create);
app.put("/users/:id", updateUser);
app.delete("/users", removeUser);


app.listen(config.getSection("services").events.port, (err) => {
    err 
    ? console.log(err)
    : console.log(`Service [users] successfully started at port ${config.getSection("services").events.port}`);
  });