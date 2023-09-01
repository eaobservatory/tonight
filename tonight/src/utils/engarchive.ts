import dotenv from "dotenv";
import { getDateArray, getPrevDay } from "@/utils/date";
import { labels } from "@/constants/plots";
import { cache } from "react";

dotenv.config({ path: "@/../env" });

type PV = keyof typeof labels;

// date should be a string in format YYYY-MM-DD
export const getPV = cache(async (pv: PV, date = "live") => {
  let dateArray;
  if (date == "live") {
    dateArray = getDateArray();
  } else {
    dateArray = [getPrevDay(date), date.split("-")];
  }
  const pvEscaped = encodeURIComponent(pv); // url encoded pv
  const username = process.env.STAFF_USERNAME;
  const password = process.env.STAFF_PASSWORD;
  const url = `http://engarchive.eao.hawaii.edu/cgi-bin/CGIExport.cgi?DIRECTORY=%2Fjcmtdata%2Fepics_data%2Fchanarch%2Fdir&PATTERN=&NAMES=${pvEscaped}%0D%0A&STARTMONTH=${dateArray[0][1]}&STARTDAY=${dateArray[0][2]}&STARTYEAR=${dateArray[0][0]}&STARTHOUR=14&STARTMINUTE=01&STARTSECOND=00&ENDMONTH=${dateArray[1][1]}&ENDDAY=${dateArray[1][2]}&ENDYEAR=${dateArray[1][0]}&ENDHOUR=13&ENDMINUTE=59&ENDSECOND=00&COMMAND=GET&Y0=0&Y1=0&REDUCE=ON&FORMAT=SPREADSHEET&INTERPOL=0`;
  console.log(`${pv}: trying getPV...\t${new Date().toLocaleString()}\n${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
      // next: {
      //   revalidate: 60 * 5, // revalidate every 5 minutes
      // },
    });
    const res = await response.text();
    const data = res
      .split("\n") // split response into lines
      .slice(18, -1); // remove header
    cleanPVData(data, pv);
    console.log(`${pv}: success!`);
    return { label: labels[pv], data: data };
  } catch (e) {
    console.log(`${pv}: ERROR -- ${(e as Error).message}`);
    return []; // plot should be blank if error occurs
  }
});

const cleanPVData = (data: string[], pv: PV) => {
  // remove #N/A and lines whose values start with a space
  for (let i = data.length - 1; i >= 0; i--) {
    const line = data[i];
    if (
      line.endsWith("#N/A") ||
      (line.split("\t")[1] && line.split("\t")[1].startsWith(" "))
    ) {
      data.splice(i, 1);
    }
  }

  // remove 0s
  const removeZeroesList: PV[] = [
    "ws:wxt510:stat:airTemp",
    "ws:wxt510:stat:pressure",
    "ws:wxt510:stat:humidity",
    "scu2CCS:ls370c:chan:k",
  ];

  const removeZeroes = (data: string[]) => {
    for (let i = 0; i < data.length; i++) {
      const line = data[i];
      const point = line.split("\t");
      if (Number(point[1]) == 0) {
        data.splice(i, 1);
        i--;
      }
    }
  };

  if (removeZeroesList.includes(pv)) {
    removeZeroes(data);
  }
};
