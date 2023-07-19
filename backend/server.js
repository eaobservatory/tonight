const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/test", (req, res) => {
  res.json({ message: "hello world!" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
