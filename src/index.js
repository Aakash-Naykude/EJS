const express = require('express')
const app = express()
app.use(express.json())
const userController = require("./controllers/user.controller")
app.use("/useruploads", userController)
const galleryController = require("./controllers/gallery.controller")
app.use("/gallaryupload", galleryController)
module.exports = app;