import useFetch from "../hooks/useFetch";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";

interface Props {
  title: string; // title of figure
  endpoint: string; // API endpoint with data to plot
  groups?: string[][]; // array of arrays of PV variables to plot on same axes
}

interface PlotLayout {
  title: string;
  [key: string]: any;
}

function Figure({ title, endpoint, groups }: Props) {
  const { data: apiData } = useFetch(`http://localhost:3001${endpoint}`); // API call -> database querying
  const dateArray = apiData && apiData["dateArray"] ? apiData["dateArray"] : []; // used for plot axis range, grabbing from API ensures same dates from data as on plot
  const keys: string[] = apiData
    ? Object.keys(apiData).filter((key) => key !== "dateArray") // filter to remove 'dateArray' key, only keep PVs
    : [];
  const plotGroups: string[][] = groups || [keys]; // each group is one set of PV variables to plot on same axes
  const plotData: Data[] = []; // array of data to pass to Plot component
  const plotLayout: PlotLayout = {
    title: title,
    xaxis: {
      type: "date", // specify that the x-axis data are timestamps
      tickformat: "%H", // format the tick values as 'HH'
      dtick: 3600000, // set tick interval to 1 hour
      range:
        dateArray && dateArray.length >= 2
          ? [
              `${dateArray[0][0]}-${dateArray[0][1]}-${dateArray[0][2]} 14:00:00`,
              `${dateArray[1][0]}-${dateArray[1][1]}-${dateArray[1][2]} 14:00:00`,
            ]
          : ["2015-03-01 14:00:00", "2015-03-02 14:00:00"], // placeholder date while waiting for API call
    },
  };

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

  // defining vertical position of each subplot
  for (let i = 0; i < plotGroups.length; i++) {
    plotLayout[`yaxis${i + 1}`] = {
      domain: [i / plotGroups.length, (i + 1) / plotGroups.length],
      anchor: "x",
    };
  }

  // for each group of PV variables
  // plotGroups.map((group, i) => {
  plotGroups // reverse order of groups so that first group from API is plotted on top
    .slice()
    .reverse()
    .map((group, i) => {
      // create plot data for each PV variable
      group.map((key) => {
        if (apiData?.[key]) {
          const lines: string[] = apiData[key]["data"]; // each line contains date and value
          const points: [Date[], string[]] = [[], []]; // date, value

          // parse each line into date and value
          lines.map((line) => {
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
            mode: "lines",
            name: apiData[key]["label"],
            yaxis: `y${i + 1}`,
          };

          plotData.push(plotDatum);
        }
      });
    });

  return (
    <>
      <div>
        <Plot data={plotData} layout={plotLayout} />
      </div>
    </>
  );
}

export default Figure;
