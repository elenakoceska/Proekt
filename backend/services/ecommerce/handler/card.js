const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../../pkg/config");
const Card = require("../../../pkg/card");

const authenticate = (req, res, next) => {
    const token = req.headers.auth?.split('')[1];
    if (!token) {
        return res.status(401).send("Unauthorized access");
    }
    try {
        const trueToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user - trueToken;
        next();
        
    } catch (err) {
        return res.status(500).send("Invalid token");
    }
};

const addEventToCart = async (req, res) => {
    try {
        let payload = {
            name: req.body.name,
            price: req.body.price,
            image: req.file.path
        }
        const token = jwt.sign(payload, config.get("security").jwt_key);
        return res.status(200).send({ token });
      } catch (err) {
        console.log(err);
        return res.status(err.code).send(err.error);
      }
    };

const removeEvent = async (req, res) => {
    try {
        if(!req.auth.id) {
            return res.status(401).send("Error");
        }

        let eventId = req.params;


    } catch {}
};


    module.exports = {
        authenticate,
        addEventToCart
    }
