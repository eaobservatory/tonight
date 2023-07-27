const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { updateCache } = require("./src/scripts/updateCache");

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// update cache every 5 minutes
updateCache().catch((err) => console.error(err)); // on server start
setInterval(() => {
  updateCache().catch((err) => console.error(err));
}, 5 * 60 * 1000);

app.use("/api/live", require("./src/routes/live"));

app.listen(port, () => console.log(`Server running on port ${port}`));
