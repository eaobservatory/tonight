import { cache } from "react";
import { getDateArray } from "./date";
import { poolOMP } from "@/config/omp";
import { Comment } from "@/types/types";
import { RowDataPacket } from "mysql2";

export const revalidate = 60 * 5; // revalidate every 5 minutes

export const getComments = cache(async (): Promise<Comment[]> => {
  console.log("querying comments...");
  const dateArray = getDateArray();
  const dateStr = `${dateArray[2][0]}-${dateArray[2][1]}-${dateArray[2][2]}`;
  const [rows] = await poolOMP.query(
    `SELECT date, author, text FROM ompshiftlog WHERE telescope = "JCMT" AND DATE(date) = ? ORDER BY date DESC`,
    [dateStr]
  );
  const comments = (rows as RowDataPacket[]).map((row: RowDataPacket) => ({
    date: row.date,
    author: row.author,
    text: row.text,
  }));
  console.log("retrieved comments!");
  return comments;
});
