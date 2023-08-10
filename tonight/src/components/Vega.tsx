import * as vega from "vega";
import * as lite from "vega-lite";
import { jcmtwx, jcmtnama } from "@/constants/figureGroups";
import { getPV } from "@/utils/engarchive";

const getUTCHour = (date: string) => {
  console.log(typeof date);
  let utcHour = Number(date.substring(11, 13)) + 10; // UTC is 10 hours ahead of HST
  if (utcHour >= 24) {
    utcHour -= 10;
  }
  const hourStr = utcHour.toString().padStart(2, "0");
  return hourStr;
};

const createSVG = async () => {
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Line chart.",
    data: {
      values: [
        {
          dateTime: "2023-07-14T14:59:41.973441437",
          value: 28,
          subplot: "wx",
          label: "hello",
        },
        {
          dateTime: "2023-07-14T15:02:21.973435037",
          value: 55,
          subplot: "wx",
          label: "world",
        },
        {
          dateTime: "2023-07-14T16:03:41.973431837",
          value: 43,
          subplot: "wx",
          label: "message",
        },
        {
          dateTime: "2023-07-14T17:05:01.973428637",
          value: 91,
          subplot: "nama",
          label: "hello",
        },
        {
          dateTime: "2023-07-14T18:06:21.973425437",
          value: 81,
          subplot: "nama",
          label: "world",
        },
        {
          dateTime: "2023-07-14T19:07:41.973422237",
          value: 53,
          subplot: "nama",
          label: "message",
        },
        {
          dateTime: "2023-07-14T20:09:01.973419037",
          value: 19,
          subplot: "nama",
          label: "hello",
        },
        {
          dateTime: "2023-07-14T21:10:21.973415837",
          value: 87,
          subplot: "nama",
          label: "world",
        },
        {
          dateTime: "2023-07-14T22:11:41.973412637",
          value: 52,
          subplot: "nama",
          label: "message",
        },
      ],
    },
    transform: [
      {
        calculate: "utc(datum.dateTime)",
        as: "utcDateTime",
      },
      {
        calculate: "hours(datum.utcDateTime)",
        as: "utcHour",
      },
      // {
      //   calculate: "datum.value - 10",
      //   as: "value",
      // },
    ],
    facet: {
      row: {
        field: "subplot",
        type: "nominal",
        header: {
          title: { field: "subplot", type: "nominal" },
          labelFontSize: 11,
          labelFontWeight: "bold",
          labelPadding: 0,
        },
      },
    },
    spec: {
      layer: [
        {
          width: 800,
          mark: "point",
          encoding: {
            x: {
              field: "dateTime",
              type: "temporal",
              scale: {
                domain: ["07/14/2023 14:00:00.000", "07/15/2023 14:00:00.000"],
              },
              axis: {
                format: "%H",
                title: "HST",
                titlePadding: 10,
              },
            },
            y: { field: "value", type: "quantitative", axis: { title: null } },
            color: {
              field: "label",
              type: "nominal",
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
        },
        // // transparent layer for UTC axis labels
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
        //       },
        //       // timeUnit: "yearmonthdatehoursminutes",
        //       // scale: { type: "utc" },
        //     },
        //   },
        // },
      ],
      resolve: { axis: { x: "independent" } },
    },
  } as unknown as lite.TopLevelSpec;

  const vegaspec = lite.compile(spec).spec;
  const view = new vega.View(vega.parse(vegaspec), { renderer: "none" });
  const svgStr = await view.toSVG();
  return svgStr;
};

const VegaChart = async () => {
  try {
    const svgStr = await createSVG();
    const date = new Date();
    const timeStr = date.getHours() + ":" + date.getMinutes();

    return (
      <div>
        <p>{timeStr}</p>
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svgStr)}`} />
      </div>
    );
  } catch (e) {
    return <p>{(e as Error).message}</p>;
  }
};

export default VegaChart;
