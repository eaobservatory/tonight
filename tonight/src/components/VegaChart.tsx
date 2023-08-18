import * as vega from "vega";
import * as lite from "vega-lite";
import { plots } from "@/constants/plots";
import { getPV } from "@/utils/engarchive";
import { getDateArray, getPrevDay } from "@/utils/date";

interface Props {
  plot: string;
  mark: string;
  date?: string;
}

interface Value {
  dateTime: string;
  value: string;
  subplot: string;
  label: string;
}

// vega.expressionFunction("getUTCHour", function (datum: Value, params: number) {
//   const date = String(datum.dateTime);
//   let utcHour = Number(date.substring(11, 13)) + params; // UTC is 10 hours ahead of HST
//   if (utcHour >= 24) {
//     utcHour -= 10;
//   }
//   const hourStr = utcHour.toString().padStart(2, "0");
//   return hourStr;
// });

// const getUTCHour = (date: string) => {
//   let utcHour = Number(date.substring(11, 13)) + 10; // UTC is 10 hours ahead of HST
//   if (utcHour >= 24) {
//     utcHour -= 10;
//   }
//   const hourStr = utcHour.toString().padStart(2, "0");
//   return hourStr;
// };

const cleanPVData = (pvData: { [key: string]: any }) => {
  // remove 0.0
  const removeZero = (pv: string) => {
    if (pvData[pv]) {
      const data = pvData[pv]["data"];
      for (let i = 0; i < data.length; i++) {
        const line = data[i];
        const point = line.split("\t");
        if (point[1] == "0.0") {
          data.splice(i, 1);
          i--;
        }
      }
    }
  };

  // jcmtwx
  removeZero("ws:wxt510:stat:airTemp");
  removeZero("ws:wxt510:stat:pressure");
  removeZero("ws:wxt510:stat:humidity");

  //jcmtsc2
  removeZero("scu2CCS:ls370c:chan:k");
};

const getPVData = async (plot: string, date: string) => {
  const pvData: { [key: string]: any } = {};
  for (const subplot of plots[plot]) {
    for (const pvs of Object.values(subplot)) {
      for (const pv of pvs) {
        pvData[pv] = await getPV(pv, date);
      }
    }
  }
  cleanPVData(pvData);
  return pvData;
};

const createSVG = async (plot: string, mark: string, date: string) => {
  let dateArray;
  if (date == "live") {
    dateArray = getDateArray();
  } else {
    dateArray = [getPrevDay(date), date.split("-")];
  }
  const pvData = await getPVData(plot, date);
  const values: Value[] = [];
  const numSubplots = plots[plot].length;

  // populate values array to pass into spec
  for (const subplot of plots[plot]) {
    const subplotName = Object.keys(subplot)[0];
    for (const pvs of Object.values(subplot)) {
      for (const pv of pvs) {
        const { label, data } = pvData[pv];
        for (const line of data) {
          const point = line.split("\t");
          if (point[1] != "#N/A" && !point[1].startsWith(" ")) {
            // const utc = getUTCHour(point[0]);
            const value = {
              dateTime: point[0],
              value: point[1],
              subplot: subplotName,
              label: label,
              // utc: utc,
            };
            values.push(value);
          }
        }
      }
    }
  }

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Chart for JCMT observing conditions.",
    data: {
      values: values,
    },
    facet: {
      row: {
        field: "subplot",
        type: "nominal",
        header: {
          title: { field: "subplot", type: "nominal" },
          FontSize: 11,
          labelFontWeight: "bold",
          labelPadding: 0,
        },
      },
    },
    spec: {
      layer: [
        {
          width: 800,
          height: 400 / numSubplots,
          mark: { type: mark, clip: true },
          encoding: {
            x: {
              field: "dateTime",
              type: "temporal",
              scale: {
                domain: [
                  `${dateArray[0][1]}/${dateArray[0][2]}/${dateArray[0][0]} 14:00:00.000`,
                  `${dateArray[1][1]}/${dateArray[1][2]}/${dateArray[1][0]} 14:00:00.000`,
                ],
              },
              axis: {
                format: "%H",
                title: "Time (HST)",
                titlePadding: 10,
              },
            },
            y: {
              field: "value",
              type: "quantitative",
              axis: { title: null },
              scale: { zero: false },
            },
            color: {
              field: "label",
              type: "nominal",
              legend: {
                orient: "bottom",
                title: null,
              },
              scale: {
                range: [
                  "#1f77b4", // blue
                  "#ff7f0e", // orange
                  "#2ca02c", // green
                  "#d62728", // red
                  "#9467bd", // purple
                  "#8c564b", // brown
                  "#e377c2", // pink
                  "#7f7f7f", // gray
                  "#bcbd22", // yellow-green
                  "#17becf", // teal
                  "#f74e8f", // magenta
                  "#9c9ede", // light blue
                ],
              },
            },
          },
          // resolve: {
          //   scale: { x: "independent" },
          // },
        },
        // transparent layer for UTC axis labels
        // {
        //   mark: { type: "line", opacity: 0 },
        //   encoding: {
        //     x: {
        //       field: "dateTime",
        //       type: "temporal",
        //       axis: {
        //         format: "%H",
        //         title: "UTC",
        //         titlePadding: 10,
        //         orient: "top",
        //       },
        //       timeUnit: "yearmonthdatehoursminutes",
        //       scale: { type: "utc" },
        //     },
        //   },
        //   // resolve: {
        //   //   scale: { x: "independent" },
        //   // },
        // },
      ],
      resolve: {
        axis: { x: "independent" },
      },
    },
    resolve: {
      scale: { y: "independent" },
    },
  } as unknown as lite.TopLevelSpec;

  const config = {
    config: { customFormatTypes: true, lineBreak: "\n" },
  };

  const vegaspec = lite.compile(spec, config).spec;
  const view = new vega.View(vega.parse(vegaspec), { renderer: "none" });
  const svgStr = await view.toSVG();
  return svgStr;
};

const VegaChart = async ({ plot, mark, date = "live" }: Props) => {
  try {
    const svgStr = await createSVG(plot, mark, date);

    const dateObj = new Date();
    const timeStr =
      dateObj.getHours() + ":" + String(dateObj.getMinutes()).padStart(2, "0");
    const dateArray = getDateArray();
    const pvData = await getPVData(plot, date);
    const dataStr = JSON.stringify(pvData, null, 2);

    return (
      <div>
        <p>{timeStr}</p>
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svgStr)}`} />
        <pre style={{ fontSize: "10px" }}>{dataStr}</pre>
      </div>
    );
  } catch (e) {
    return <p>{(e as Error).message}</p>;
  }
};

export default VegaChart;
