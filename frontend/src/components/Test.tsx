import OldFigure from "./OldFigure";
import useFetch from "../hooks/useFetch";
import Plot from "react-plotly.js";
import Figure from "./Figure";

function Test() {
  const figures = {
    "EAO Weather": {
      endpoint: "/api/live/jcmtwx",
    },
    "SMA Phase Monitor": {
      endpoint: "/api/live/smaphase",
    },
    "MK Opacity": {
      endpoint: "/api/live/mkopac",
    },
    "JCMT Temperature": {
      endpoint: "/api/live/jcmttemp",
    },
    "JCMT Camera": {
      endpoint: "/api/live/jcmtcam",
    },
    "JCMT Dome": {
      endpoint: "/api/live/jcmtdome",
    },
    "UKIRT Dome": {
      endpoint: "/api/live/ukirtdome",
    },
    "JCMT Position": {
      endpoint: "/api/live/jcmtposn",
    },
    "JCMT SMU (NS)": {
      endpoint: "/api/live/jcmtsmuns",
    },
    "JCMT SMU (EW)": {
      endpoint: "/api/live/jcmtsmuew",
    },
    "HARP Instrument Status": {
      endpoint: "/api/live/jcmtharp",
    },
    "Namakanui Instrument Status": {
      endpoint: "/api/live/jcmtnamakanui",
    },
    "SCUBA-2 Instrument Status": {
      endpoint: "/api/live/jcmtsc2",
    },
    "SCUBA-2 Data Reduction Pipeline FCFs": {
      endpoint: "/api/live/sc2perffcf",
    },
    "SCUBA-2 Data Reduction Pipeline NEFDs": {
      endpoint: "/api/live/sc2perfnefd",
    },
    "SCUBA-2 Data Reduction Pipeline Flats": {
      endpoint: "/api/live/sc2perfflat",
    },
    "SCUBA-2 Data Reduction Pipeline Noise": {
      endpoint: "/api/live/sc2perfnoise",
    },
  };

  return (
    <>
      <Figure endpoint="/api/test" />
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [4, 5, 6],
            type: "scatter",
            mode: "lines",
            marker: { color: "red" },
            name: "line 1",
          },
          {
            x: [1, 2, 3],
            y: [5, 6, 7],
            type: "scatter",
            mode: "lines",
            marker: { color: "blue" },
            name: "line 2",
          },
        ]}
        layout={{
          xaxis: { range: [0, 10] },
          yaxis: { range: [0, 10] },
          title: "Test Plot",
        }}
      />
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [4, 5, 6],
            type: "scatter",
            mode: "lines",
            marker: { color: "red" },
            name: "Line 1",
            xaxis: "x1",
            yaxis: "y1",
          },
          {
            x: [1, 2, 3],
            y: [2, 3, 4],
            type: "scatter",
            mode: "lines",
            marker: { color: "blue" },
            name: "Line 2",
            xaxis: "x2",
            yaxis: "y2",
          },
        ]}
        layout={{
          xaxis: { domain: [0, 0.45] },
          yaxis2: { anchor: "x2" },
          xaxis2: { domain: [0.55, 1] },
          title: "Multiple Subplots",
        }}
      />
      {/* <OldFigure title="test" endpoint="/api/live/jcmtwx" /> */}
      {/* <div className="figure-container">
        {Object.entries(figures).map(([key, values], index) => (
          <OldFigure title={key} endpoint={values.endpoint} key={index} />
        ))}
      </div> */}
    </>
  );
}

export default Test;
