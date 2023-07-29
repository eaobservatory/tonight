const fs = require("fs");
const path = require("path");
const { getDateArray, convertUTCToHST } = require("../../utils/date");

const getJCMTSMU = async (req, res) => {
  //   const dateArray = getDateArray();
  const dateArray = [
    // for testing purposes
    ["2023", "07", "26"],
    ["2023", "07", "27"],
    ["2023", "07", "27"],
  ];
  const logFilePath = path.join(__dirname, "../../temp/SMU_param_3.log"); // change path in production
  //   const logFilePath = `/jac_logs/${dateArray[2][0]}${dateArray[2][1]}${dateArray[2][2]}/SMU_param.log`;

  // check for existence of file
  if (!fs.existsSync(logFilePath)) {
    console.error("File does not exist:", logFilePath);
    return res.status(404).json({
      dateArray: dateArray,
      ns: {
        label: "ns",
        data: [],
      },
      ew: {
        label: "ew",
        data: [],
      },
    }); // send empty data back
  }

  // read file
  fs.readFile(logFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file from disk: ${err}`);
      return res.status(500).json({
        dateArray: dateArray,
        ns: {
          label: "ns",
          data: [],
        },
        ew: {
          label: "ew",
          data: [],
        },
      }); // send empty data back
    }

    let lines = data.split("\n");
    lines = lines.filter((line) => line.startsWith("Date"));
    ns_data = [];
    ew_data = [];

    lines.forEach((line) => {
      const lineArray = line.split(/\s+/); // split on whitespace
      const dateArray = [
        lineArray[5],
        lineArray[2],
        lineArray[3],
        lineArray[4],
      ]; // YYYY, MMM, DD, HH:MM:SS
      const dateStr = convertUTCToHST(dateArray); // SMU_param.log files are in UTC
      const ns = lineArray[7];
      const ew = lineArray[9];
      ns_data.push(`${dateStr}\t${ns}`);
      ew_data.push(`${dateStr}\t${ew}`);
    });

    res.json({
      dateArray: dateArray,
      ns: {
        label: "ns",
        data: ns_data,
      },
      ew: {
        label: "ew",
        data: ew_data,
      },
    });
  });
};

module.exports = {
  getJCMTSMU,
};
