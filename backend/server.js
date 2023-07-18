const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

app.get("/test", (req, res) => {
  res.status(200).send({ message: "Test" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
