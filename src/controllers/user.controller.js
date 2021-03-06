const User = require("../models/user.model");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

router.get("/", async (req, res) => {
  const users = await User.find().lean().exec();
  return res.render("products/all", {
    users,
  });
});


router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).lean().exec();
  return res.render("products/single", {
    user,
  });
});


router.post("/news", upload.single("profile_pic"), async (req, res) => {
  try {
    const newuser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });
    return res.render("products/single",{ newuser });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
});
router.post("/", upload.single("profile_pic"), async (req, res) => {
  try {
    const newuser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });
    return res.status(201).json({ newuser });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.status(201).send({ users });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id).lean().exec();
    return res.status(201).send({ users });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
});
router.patch("/:id", upload.single("profile_pic"), async (req, res) => {
  const user = await User.findById(req.params.id);
  await fs.unlink(`${user.profile_pic}`, (err) => {
    if (err) throw err;
    console.log(`user.profile pic was deleted`);
  });
  try {
    const newuser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });
    return res.status(201).json({ newuser });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
});
router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  await fs.unlink(`${user.profile_pic}`, (err) => {
    if (err) throw err;
    console.log(`user.porfile pic is deleted`);
  });
  try {
    const users = await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(201).send({ users });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
});
module.exports = router;
