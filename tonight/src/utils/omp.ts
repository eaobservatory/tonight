import { cache } from "react";
import { getDateArray } from "./date";
import { poolOMP, poolJCMT } from "@/config/omp";
import { RowDataPacket } from "mysql2";
import { dateToTime } from "@/utils/date";

export const revalidate = 60 * 5; // revalidate every 5 minutes

export const getComments = cache(async (date: string) => {
  let dateStr;
  if (date == "live") {
    const dateArray = getDateArray();
    dateStr = `${dateArray[2][0]}-${dateArray[2][1]}-${dateArray[2][2]}`;
  } else {
    dateStr = date;
  }

  const [rows] = await poolOMP.query(
    `SELECT date, author, text FROM ompshiftlog WHERE telescope = "JCMT" AND DATE(date) = ? ORDER BY date DESC`,
    [dateStr]
  );

  const comments = (rows as RowDataPacket[]).map((row: RowDataPacket) => ({
    date: dateToTime(row.date),
    author: row.author,
    text: row.text,
  }));

  return comments;
});

const getMode = (
  obsType: string,
  scanPat: string,
  samMode: string,
  swMode: string
) => {
  if (obsType != "science") {
    return obsType;
  } else {
    if (scanPat != null && scanPat != "DISCRETE_BOUSTROPHEDON") {
      return scanPat;
    } else {
      return `${samMode}_${swMode}`;
    }
  }
};

export const getSCUBA2Index = cache(async (date: string) => {
  let dateStr;
  if (date == "live") {
    const dateArray = getDateArray();
    dateStr = `${dateArray[2][0]}${dateArray[2][1]}${dateArray[2][2]}`;
  } else {
    dateStr = date.replace(/-/g, ""); // remove dashes
  }

  const [rows] = await poolJCMT.query(
    `SELECT backend, obsnum, utdate, date_obs, date_end, project, obs_type, scan_pat, sam_mode, sw_mode, recipe, object, map_wdth, map_hght, tau225st, tau225en, wvmtaust, wvmtauen, seeingst, seeingen, roofstst, doorstst FROM SCUBA2 LEFT JOIN COMMON ON SCUBA2.obsid = COMMON.obsid WHERE utdate = ? ORDER BY obsnum DESC`,
    [dateStr]
  );

  const observations = (rows as RowDataPacket[]).map((row: RowDataPacket) => ({
    backend: row.backend,
    obsnum: row.obsnum,
    utdate: row.utdate,
    obstime: `${dateToTime(row.date_obs)} - ${dateToTime(row.date_end)}`,
    project: row.project,
    mode: getMode(row.obs_type, row.scan_pat, row.sam_mode, row.sw_mode),
    inbeam: row.recipe == "REDUCE_POL_SCAN" ? "POL" : "n/a",
    object: row.object,
    map:
      row.map_wdth != null && row.map_hght != null
        ? `${(row.map_wdth / 60).toFixed(1)}' x ${(row.map_hght / 60).toFixed(
            1
          )}'`
        : "n/a",
    tau225:
      row.tau225st != null && row.tau225en != null
        ? ((row.tau225st + row.tau225en) / 2).toFixed(2)
        : "n/a",
    wvmtau:
      row.wvmtaust != null && row.wvmtauen != null
        ? ((row.wvmtaust + row.wvmtauen) / 2).toFixed(2)
        : "n/a",
    seeing:
      row.seeingst != null && row.seeingen != null
        ? ((row.seeingst + row.seeingen) / 2).toFixed(2)
        : "n/a",
    roof: row.roofstst,
    door: row.doorstst,
  }));

  // keep one observation per obsnum
  const uniqueObservations = observations.filter((obs, index, arr) => {
    return arr.findIndex((o) => o.obsnum === obs.obsnum) === index;
  });

  return uniqueObservations;
});

export const getACSISIndex = cache(async (date: string) => {
  let dateStr;
  if (date == "live") {
    const dateArray = getDateArray();
    dateStr = `${dateArray[2][0]}${dateArray[2][1]}${dateArray[2][2]}`;
  } else {
    dateStr = date.replace(/-/g, ""); // remove dashes
  }

  const [rows] = await poolJCMT.query(
    `SELECT backend, obsnum, utdate, date_obs, date_end, project, obs_type, scan_pat, sam_mode, sw_mode, instrume, restfreq, object, steptime, tau225st, tau225en, wvmtaust, wvmtauen, roofstst, doorstst FROM ACSIS JOIN COMMON ON ACSIS.obsid = COMMON.obsid WHERE utdate = ? ORDER BY obsnum DESC`,
    [dateStr]
  );

  const observations = (rows as RowDataPacket[]).map((row: RowDataPacket) => ({
    backend: row.backend,
    obsnum: row.obsnum,
    utdate: row.utdate,
    obstime: `${dateToTime(row.date_obs)} - ${dateToTime(row.date_end)}`,
    project: row.project,
    mode: getMode(row.obs_type, row.scan_pat, row.sam_mode, row.sw_mode),
    receiver: `${row.instrume}/${row.restfreq.toFixed(1)}`,
    object: row.object,
    steptime: row.steptime.toFixed(1),
    tau225:
      row.tau225st != null && row.tau225en != null
        ? ((row.tau225st + row.tau225en) / 2).toFixed(2)
        : "n/a",
    wvmtau:
      row.wvmtaust != null && row.wvmtauen != null
        ? ((row.wvmtaust + row.wvmtauen) / 2).toFixed(2)
        : "n/a",
    seeing:
      row.seeingst != null && row.seeingen != null
        ? ((row.seeingst + row.seeingen) / 2).toFixed(2)
        : "n/a",
    roof: row.roofstst,
    door: row.doorstst,
  }));

  // keep one observation per obsnum
  const uniqueObservations = observations.filter((obs, index, arr) => {
    return arr.findIndex((o) => o.obsnum === obs.obsnum) === index;
  });

  return uniqueObservations;
});
