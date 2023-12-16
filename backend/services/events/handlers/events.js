const jwt = require("jsonwebtoken");
const Event = require ("../../../pkg/events");

const authenticate = (req, res, next) => {
    const token = req.headers.auth?.split('')[1];
    if (!token) {
        return res.status(401).send("Unauthorized acces");
    }
    try {
        const trueToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user - trueToken;
        next();
        
    } catch (err) {
        return res.status(500).send("Invalid token");
    }
};


const createEvent = async(req, res) => {
    try{
        if (req.user.role !== administrator) {
            return res.status(401).send("Unatorized access");
        }
        const events = await Event.create(req.body);
        return res.status(201).send(events);
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

const getUserEvents = async(req, res) => {
    try{
        const events = await Event.findById(req.params.id);
        return res.status(200).send(events);

    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

const getAll = async(req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        let query = {};
        if (req.query.category) {
            query.category = req.quert.subcategory;
        }
        const events = await Event.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
        
        const totalEvents = await Event.countEvents(query);
        return res.status(200).send ({
            message: `${events.length} events are found`,
            total: totalEvents,
            data: events,
        });
    } catch (err) {
        return res.status(500).send("Internal Server Error")
    }
};

const updateEvent = async (req, res) => {
    try{
        if(req.user.role !== "administrator") {
            return res.status(401).send("Unautorized access");
        } 
        await Event.findById.update(req.params.id, req.body);
        return res.status(200).send("Successfully updated");
    } catch (err) {
        return res.status(500).send("Internal server error")
    }
};

const removeEvent = async (req, res) => {
    try {
        if (req.user.rode !== "administrator") {
            return res.status(401).send("Unautorized access");
        }
        await Event.findById.delete(req.params.id);
        return res.status(200).send("The item id deleted");
    } catch (err) {
        return res.status(500).send("Internal server error")
    
    }
}

module.exports = {
    authenticate,
    createEvent,
    getUserEvents,
    getAll,
    updateEvent,
    removeEvent
};
