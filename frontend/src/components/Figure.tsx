import { useState, useEffect, useContext } from "react";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";
import { EPICSContext } from "../App";

type Endpoint = "jcmtwx" | "jcmtsc2" | "jcmtnamakanui" | "jcmtsmu";
type Group = { [key: string]: string[] }; // {y-axis label: PV variables}

interface Props {
  title: string; // title of figure
  endpoint: Endpoint; // API endpoint with data to plot (/api/live/{endpoint})
  mode: any; // type of plot to display (lines, markers, lines+markers, etc.)
  groups: Group[]; // array of Groups, each group is one set of PV variables to plot on same axes
}

interface PlotLayout {
  [key: string]: any;
}

function Figure({ title, endpoint, mode, groups }: Props) {
  try {
    const [plotData, setPlotData] = useState<Data[]>([]); // used for displaying old data while updating with new data
    const [plotLayout, setPlotLayout] = useState<PlotLayout>({
      title: title,
      xaxis: {
        type: "date", // specify that the x-axis data are timestamps
        tickformat: "%H", // format the tick values as 'HH'
        dtick: 3600000, // set tick interval to 1 hour
        range: ["2015-03-01 14:00:00", "2015-03-02 14:00:00"], // placeholder date while waiting for API call
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
    });
    const contextValue = useContext(EPICSContext) ?? {};
    const apiData = contextValue[`${endpoint}APIData`];

    // update plot when apiData changes
    useEffect(() => {
      if (apiData) {
        const keys: string[] = apiData
          ? Object.keys(apiData).filter((key) => key !== "dateArray") // filter to remove 'dateArray' key, only keep PVs
          : [];

        // CREATE NEW PLOT LAYOUT
        let newPlotLayout: PlotLayout = { ...plotLayout, shapes: [] };

        // update x-axis range in plotLayout with new dateArray
        const dateArray =
          apiData && apiData["dateArray"] ? apiData["dateArray"] : []; // used for plot axis range, grabbing from API ensures same dates from data as on plot
        newPlotLayout.xaxis.range =
          dateArray && dateArray.length >= 2
            ? [
                `${dateArray[0][0]}-${dateArray[0][1]}-${dateArray[0][2]} 14:00:00`,
                `${dateArray[1][0]}-${dateArray[1][1]}-${dateArray[1][2]} 14:00:00`,
              ]
            : ["2015-03-01 14:00:00", "2015-03-02 14:00:00"]; // placeholder date while waiting for API call

        // defining vertical position of each subplot
        for (let i = 0; i <= groups.length; i++) {
          if (i < groups.length) {
            const yAxisName = i === 0 ? "yaxis" : `yaxis${i + 1}`;
            newPlotLayout[yAxisName] = {
              domain: [i / groups.length, (i + 1) / groups.length],
              anchor: "x",
              zeroline: false,
              linecolor: "black",
              mirror: true,
            };
          }

          // add horizontal line to separate each subplot
          newPlotLayout.shapes.push({
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
          });
        }

        // CREATE NEW PLOT DATA
        const newPlotData: Data[] = []; // array of data to pass to Plot component

        // for each group of PV variables
        groups // reverse order of groups so that first group from API is plotted on top
          .slice()
          .reverse()
          .forEach((group: Group, i) => {
            const yAxisName = i === 0 ? "yaxis" : `yaxis${i + 1}`;
            newPlotLayout[yAxisName].title = Object.keys(group)[0]; // y-axis label is key of each group
            // create plot data for each PV variable
            Object.keys(group).forEach((yAxis) => {
              group[yAxis].forEach((pv) => {
                if (apiData?.[pv]) {
                  const lines: string[] = apiData[pv]["data"]; // each line contains date and value
                  const points: [Date[], string[]] = [[], []]; // date, value

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
                    name: apiData[pv]["label"],
                    yaxis: `y${i + 1}`,
                  };

                  newPlotData.push(plotDatum);
                }
              });
            });
          });

        // UPDATE PLOT
        setPlotLayout(newPlotLayout);
        setPlotData(newPlotData);
      }
    }, [apiData]); // update plot when apiData changes (refetch happens in App.tsx)

    return (
      <>
        <Plot data={plotData} layout={plotLayout} />
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

export default Figure;
