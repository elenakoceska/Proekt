const config = require("../../pkg/config");
const db = require("../../pkg/db");
const express = require("express");
const jwt = require("express-jwt");
const authors = require("./handlers/events");

db.init();

const app = express();
app.use(express.json());

app.use(jwt.expressjwt({
    algorithms: ["HS256"],
    secret: config.getSection("security").jwt_secret
}));


app.get("/api/v1/events", events.getAll);
app.get("/api/v1/events/:id", events.getUserEvents);

app.post("/api/v1/events", events.createEvent);
app.put("/api/v1/events/:id", events.updateEvent);
app.delete("/api/v1/events/:id", events.removeEvent);

app.listen(config.getSection("services").events.port, (err) => {
  err 
  ? console.log(err)
  : console.log(`Service [events] successfully started at port ${config.getSection("services").events.port}`);
});