import dotenv from "dotenv";
import { getDateArray } from "@/utils/date";
import { labels } from "@/constants/plots";

dotenv.config({ path: "@/../env" });

type PV = keyof typeof labels;

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
