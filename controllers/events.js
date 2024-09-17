const Event = require("../models/Event");
const User = require("../models/user");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("user", "name",).sort({createdAt: -1});

    return res.json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

const createEvent = async (req, res) => {
  const event = new Event({
    ...req.body,
    user: req.id,
  });

  try {
    await event.save();

    return res.status(201).json({
      ok: true,
      event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, start, end, notes } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(
      id,
      {
        title,
        start,
        end,
        notes,
      },
      { new: true }
    );

    return res.json({ ok: true, event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);

    return res.json({
      ok: true,
      event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};



const toList = async (req, res) => {
  const { id, action } = req.params;
console.log(req.params)
  const update = action === "remove" ? {
      $pull: { list: id }
    }: {
      $push: { list: id }
    }

  try {
    await User.updateOne({ _id: req.id, }, update);

     const lists = await User.findById(req.id).select({ list:1 });

    return res.json({
      ok: true,
      lists,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};




module.exports = { getEvents, createEvent, updateEvent, deleteEvent, toList };
