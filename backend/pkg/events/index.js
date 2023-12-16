const mongoose = require("mongoose");

// const Event = mongoose.model(
//     "event",
//     {
//         user_id: String,
//         content: String,
//         published_on: Date
//     },
//     "events"
// );

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    image: {
        type:String,
    },

    date: {
        type: Date,
        required: true,

    },

    place: {
        type: String,
        required: true,
        unique: true,
    },

    category: {
        type: String,
        enum: ["Musical Concerts", "Stand-Up Comedy"],
    },

    subcategories: {
        type: [String],
        enum: [
            "Rock",
            "Pop",
            "Hip-hop",
            "Country",
            "Latin",
            "Political",
            "Satire",
            "Topical",
            "Situational",

        ]
    }

});

module.exports = mongoose.events("event", eventSchema, "eventSchema");

const getAll = async () => {
    return Event.find({});
};

const getUserEvents = async (user_id) => {
    return Event.find({ user_id });
};

const create = async (data) => {
    const event = new Event(data);
    return event.save();
};

const update = async (id, uid, data) => {
    return Event.updateOne({ _id: id, user_id: uid }, data);
};

const remove = async (id, uid) => {
    return Event.deleteOne({ _id: id, user_id: uid });
};

module.exports = {
    getAll,
    getUserEvents,
    create,
    update,
    remove
  };