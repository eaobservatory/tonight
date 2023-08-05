const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");
const { updateCache, clearCache } = require("./src/scripts/updateCache");

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// clear cache at midnight
cron.schedule(
  "0 0 * * *",
  function () {
    clearCache()
      .then(() => {
        console.log("Cache successfully cleared");
      })
      .catch((err) => console.error(err));
  },
  {
    scheduled: true,
    timezone: "UTC",
  }
);

// update cache on server start, then every 5 minutes
updateCache().catch((err) => console.error(err));

cron.schedule(
  "*/5 * * * *",
  function () {
    updateCache().catch((err) => console.error(err));
  },
  {
    scheduled: true,
    timezone: "UTC",
  }
);

app.use("/api/live", require("./src/routes/live"));

app.listen(port, () => console.log(`Server running on port ${port}`));
