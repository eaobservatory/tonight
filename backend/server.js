const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "hello world!" });
});

app.get("/api/jcmtwx", (req, res) => {
  res.json({ image: "http://www.eao.hawaii.edu/weather/images/jacwx.png" });
});

app.get("/api/smaphase", (req, res) => {
  res.json({ image: "http://www.eao.hawaii.edu/weather/images/smaphase.png" });
});

app.get("/api/mkopac", (req, res) => {
  res.json({ image: "http://www.eao.hawaii.edu/weather/images/mkopac.png" });
});

app.get("/api/jcmttemp", (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmttemp.png",
  });
});

app.get("/api/jcmt", (req, res) => {
  res.json({ image: "http://www.eao.hawaii.edu/weather/images/jcmt.jpg" });
});

app.get("/api/jcmtdome", (req, res) => {
  res.json({ image: "http://www.eao.hawaii.edu/weather/images/jcmtdome.jpg" });
});

app.get("/api/ukirtdome", (req, res) => {
  res.json({ image: "http://www.eao.hawaii.edu/weather/images/ukirtdome.jpg" });
});

app.get("/api/jcmtposn", (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtposn.png",
  });
});

app.get("/api/jcmtsmuns", (req, res) => {
  res.json({
    image:
      "https://www.eao.hawaii.edu/monitoring/secondary/jcmt/jcmtsmu_ns.png",
  });
});

app.get("/api/jcmtsmuew", (req, res) => {
  res.json({
    image:
      "https://www.eao.hawaii.edu/monitoring/secondary/jcmt/jcmtsmu_ew.png",
  });
});

app.get("/api/jcmtharp", (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtharp.png",
  });
});

app.get("/api/jcmtnamakanui", (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtnamakanui.png",
  });
});

app.get("/api/jcmtsc2", (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2.png",
  });
});

app.get("/api/sc2perffcf", (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2perffcf.png",
  });
});

app.get("/api/sc2perfnefd", (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2perfnefd.png",
  });
});

app.get("/api/sc2perfflat", (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2perfflat.png",
  });
});

app.get("/api/sc2perfnoise", (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2perfnoise.png",
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
