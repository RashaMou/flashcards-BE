const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const server = express();

// Middleware
server.use(helmet());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Serving static files from "public" folder
server.use(express.static("public"));

//Routers
server.use("/api", require("./index"));

// Routes
server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the API!" });
});

module.exports = server;
