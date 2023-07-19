const express = require("express");
const app = express();
const dotenv = require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/test", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
