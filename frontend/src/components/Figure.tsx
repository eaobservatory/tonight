import useFetch from "../hooks/useFetch";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";

interface Props {
  endpoint: string; // api endpoint with data to plot
  groups?: string[][]; // array of arrays of PV variables to plot on same axes
}

interface PlotLayout {
  title: string;
  [key: string]: any;
}

function Figure({ endpoint, groups }: Props) {
  const { data: apiData } = useFetch(`http://localhost:3001${endpoint}`);
  const keys: string[] = apiData ? Object.keys(apiData) : [];
  const plotGroups: string[][] = groups || [keys]; // each group is one set of PV variables to plot on same axes
  const plotData: Data[] = []; // array of data to pass to Plot component
  const plotLayout: PlotLayout = {
    title: "Figure Test",
  };

  for (let i = 0; i < plotGroups.length; i++) {
    // defining vertical position of each subplot
    plotLayout[`yaxis${i + 1}`] = {
      domain: [i / plotGroups.length, (i + 1) / plotGroups.length],
      anchor: "x",
    };
  }

  plotGroups.map((group, i) => {
    // for each group of PV variables
    group.map((key) => {
      // create plot data for each PV variable
      if (apiData?.[key]) {
        const lines: string[] = apiData[key].split("\n"); // each line contains time and value
        const points: string[][] = [[], []]; // time, value

        lines.map((line) => {
          const point = line.split(" "); // time and value separated by space
          points[0].push(point[0]); // time
          points[1].push(point[1]); // value
        });

        const plotDatum: Data = {
          x: points[0],
          y: points[1],
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "red" },
          name: key,
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
