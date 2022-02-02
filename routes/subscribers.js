const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

//Getting all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Getting One
router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.fixit);
});
//Creating One
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Updating One
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.fixit.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.fixit.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedFixit = await res.fixit.save();
    res.json(updatedFixit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.fixit.remove();
    res.json({ message: "Deleted subscriber" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getSubscriber(req, res, next) {
  let fixit;
  try {
    fixit = await Subscriber.findById(req.params.id);
    if (fixit == null) {
      return res.status(404).json({ message: "Cannot find the subscriber" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.fixit = fixit;
  next();
}

module.exports = router;
