const Gallery = require("../models/gallery.model");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");
router.post("/", upload.any("pictures"), async (req, res) => {
  const filePaths = req.files.map((file) => file.path);
  try {
    const newuser = await Gallery.create({
        pictures: filePaths,
      user_id: req.body.user_id,
    });
    return res.status(201).json({ newuser });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await Gallery.find().lean().exec();
    return res.status(201).send({ users });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const users = await Gallery.findById(req.params.id).lean().exec();
    console.log(users.profile_pic);
    return res.status(201).send({ users });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const users = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(201).send({ users });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const users = await Gallery.findById(req.params.id).lean().exec();
    const files = users.pictures;
    console.log(files);
    deleteFiles(files, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("all files removed");
      }
    });
    function deleteFiles(files, callback) {
      var i = files.length;
      files.forEach(function (filepath) {
        fs.unlink(filepath, function (err) {
          i--;
          if (err) {
            callback(err);
            return;
          } else if (i <= 0) {
            callback(null);
          }
        });
      });
    }
    const newusers = await Gallery.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.status(201).send({ newusers });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
});
module.exports = router;
