import dotenv from "dotenv";
import { getDateArray } from "./date";

dotenv.config({ path: "@/../env" });

export const revalidate = 60 * 5; // revalidate every 5 minutes

export const getPV = async (pv: PV) => {
  const dateArray = getDateArray();
  const pvEscaped = encodeURIComponent(pv); // url encoded pv
  const username = process.env.STAFF_USERNAME;
  const password = process.env.STAFF_PASSWORD;
  const url = `http://engarchive.eao.hawaii.edu/cgi-bin/CGIExport.cgi?DIRECTORY=%2Fjcmtdata%2Fepics_data%2Fchanarch%2Fdir&PATTERN=&NAMES=${pvEscaped}%0D%0A&STARTMONTH=${dateArray[0][1]}&STARTDAY=${dateArray[0][2]}&STARTYEAR=${dateArray[0][0]}&STARTHOUR=14&STARTMINUTE=01&STARTSECOND=00&ENDMONTH=${dateArray[1][1]}&ENDDAY=${dateArray[1][2]}&ENDYEAR=${dateArray[1][0]}&ENDHOUR=13&ENDMINUTE=59&ENDSECOND=00&COMMAND=GET&Y0=0&Y1=0&REDUCE=ON&FORMAT=SPREADSHEET&INTERPOL=0`;
  console.log(`${pv}: trying getPV...\t${new Date().toLocaleString()}`);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    });
    const res = await response.text();
    const data = res.split("\n").slice(18, -1); // split response into lines, remove header
    console.log(`${pv}: success!`);
    return { label: labels[pv], data: data };
  } catch (error: any) {
    console.log(`${pv}: ERROR -- ${error.message}`);
    return []; // plot should be blank if error occurs
  }
};

type PV = keyof typeof labels;

const labels: { [key: string]: string } = {
  // jcmtwx
  "ws:wxt510:stat:airTemp": "temperature",
  "ws:wxt510:stat:humidity": "relative humidity",
  "ws:wxt510:stat:pressure": "barometric pressure",
  "ws:wxt510:stat:windSpd": "wind speed",
  "ws:wxt510:stat:windDir": "wind direction",
  "enviro:dewpoint": "dew point",
  // jcmtnama
  "nmnCryo:ls:temp1": "cold head 2nd stage (<3.5 K)",
  "nmnCryo:ls:temp2": "4k plate (<4.2 K)",
  "nmnCryo:ls:temp3": "cold head 1st stage (< 22 K)",
  "nmnCryo:ls:temp4": "outer shield (< 100 K)",
};
