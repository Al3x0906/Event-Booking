const Event = require("../../models/events.js");
const User = require("../../models/user.js");
const { dateToString } = require("../../helpers/date");

const transformEvent = (event) => {
  return {
    ...event._doc,
    id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator),
  };
};
const transformBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};
const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};
const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};
const events = async (eventIds) => {
  const events = await Event.find({ id: { $in: eventIds } });
  try {
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

//exports.user = user;
//exports.singleEvent = singleEvent;
//exports.events = events;
exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
