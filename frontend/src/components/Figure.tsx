import useFetch from "../hooks/useFetch";
import Plot from "react-plotly.js";
import { Data, Layout } from "plotly.js";

interface Props {
  endpoint: string; // api endpoint with data to plot
  groups?: string[][]; // array of arrays of PV variables to plot on same axes
}

function Figure({ endpoint }: Props) {
  const plotData: Data[] = []; // array of data to pass to Plot component
  const { data: apiData } = useFetch(`http://localhost:3001${endpoint}`);
  const keys = apiData ? Object.keys(apiData) : [];

  const temp = keys.map((key) => `${apiData[key]}`).join(" // ");

  keys.map((key) => {
    // looping through PV variables and creating plot data
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
    };

    plotData.push(plotDatum);
  });

  return (
    <>
      <div>
        <pre>{temp}</pre>
        <Plot data={plotData} layout={{ title: "Figure Test" }} />
      </div>
    </>
  );
}

export default Figure;
