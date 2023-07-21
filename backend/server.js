const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/live", require("./src/routes/live"));

app.get("/api/test", (req, res) => {
  // res.json({ message: "hello world!" });
  res.json({
    nmnCryo_ls_temp1: "00:01:01.959614 3.333\n00:02:21.959611 3.328",
    nmnCryo_ls_temp2: "00:01:11.959614 4.050",
    nmnCryo_ls_temp3: "00:01:21.959613 21.064\n00:02:41.959610 21.059",
    nmnCryo_ls_temp4: "00:01:31.959613 98.753\n00:02:51.959610 98.760",
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
