"use client";

import Plot from "react-plotly.js";
import { Data } from "plotly.js";
import { getDateArray } from "@/utils/date";

type Subplot = { [key: string]: string[] }; // {y-axis label: PV variables}

interface Props {
  title: string; // title of figure
  mode: any; // type of plot to display (lines, markers, lines+markers, etc.)
  groups: Subplot[]; // array of Groups, each group is one set of PV variables to plot on same axes (a subplot)
  pvData: any;
}

export default async function Figure({ title, mode, groups, pvData }: Props) {
  try {
    const dateArray = getDateArray();

    // CREATE PLOT LAYOUT
    const plotLayout: { [key: string]: any } = {
      title: title,
      xaxis: {
        type: "date", // specify that the x-axis data are timestamps
        tickformat: "%H", // format the tick values as 'HH'
        dtick: 3600000, // set tick interval to 1 hour
      },
      legend: {
        orientation: "h",
        y: -0.1,
        xanchor: "center",
        x: 0.5,
      },
      margin: {
        t: 40,
      },
    };

    // set x-axis range based on date
    plotLayout.xaxis.range = [
      `${dateArray[0][0]}-${dateArray[0][1]}-${dateArray[0][2]} 14:00:00`,
      `${dateArray[1][0]}-${dateArray[1][1]}-${dateArray[1][2]} 14:00:00`,
    ];

    // define vertical position of each subplot
    for (let i = 0; i <= groups.length; i++) {
      if (i < groups.length) {
        const yAxisName = i === 0 ? "yaxis" : `yaxis${i + 1}`;
        plotLayout[yAxisName] = {
          domain: [i / groups.length, (i + 1) / groups.length],
          anchor: "x",
          zeroline: false,
          linecolor: "black",
          mirror: true,
        };
      }

      // add horizontal line to separate each subplot
      plotLayout["shapes"] = {
        type: "line",
        xref: "paper",
        yref: "paper",
        x0: 0,
        y0: i / groups.length,
        x1: 1,
        y1: i / groups.length,
        line: {
          color: "black",
          width: 1,
        },
      };
    }

    // CREATE PLOT DATA
    const plotData: Data[] = []; // array of data to pass to Plot component

    // for each group of PV variables
    groups // reverse order of groups so that first group from API is plotted on top
      .slice()
      .reverse()
      .forEach((subplot: Subplot, i) => {
        const yAxisName = i === 0 ? "yaxis" : `yaxis${i + 1}`;
        plotLayout[yAxisName].title = Object.keys(subplot)[0]; // y-axis label is key of each subplot

        // create plot data for each PV variable
        Object.keys(subplot).forEach((yLabel) => {
          subplot[yLabel].forEach((pv) => {
            //   if (apiData?.[pv]) {
            const lines: string[] = pvData[pv]["data"]; // each line contains date and value
            const points: [Date[], string[]] = [[], []]; // date, value :: x, y

            // parse each line into date and value
            lines.forEach((line) => {
              const point = line.split("\t"); // date and value separated by tab

              // don't plot if value is #N/A
              if (point[1] != "#N/A") {
                const date: Date = parseDate(point[0]);
                points[0].push(date); // date
                points[1].push(point[1]); // value
              }
            });

            const plotDatum: Data = {
              x: points[0],
              y: points[1],
              type: "scatter",
              mode: mode,
              name: pvData[pv]["label"],
              yaxis: `y${i + 1}`,
            };

            plotData.push(plotDatum);
            //   }
          });
        });
      });

    // CREATE AND RETURN PLOT
    return (
      <>
        <Plot data={plotData} layout={plotLayout} />
        {/* {plotLayout.xaxis.range} */}
      </>
    );
  } catch (e) {
    console.log(`Error rendering figure: ${e}`);
    return (
      <>
        <p>Error rendering figure</p>
      </>
    );
  }
}

/**
 * Parses a date string from the API into a Date object.
 *
 * @param {string} str - The date string to parse. Expected format is 'MM/DD/YYYY HH:MM:SS.milliseconds'.
 * @returns {Date} - The parsed date as a Date object.
 */
const parseDate = (str: string) => {
  const dateTime = str.split(" ");
  const ymd = dateTime[0].split("/");
  const hms = dateTime[1].split(":");

  return new Date(
    Number(ymd[2]), // year
    Number(ymd[0]) - 1, // month, subtract 1 because Date() expects month to be 0-11
    Number(ymd[1]), // day
    Number(hms[0]), // hour
    Number(hms[1]), // minute
    Number(hms[2]) // second
  );
};
