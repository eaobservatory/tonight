import * as vega from "vega";
import * as lite from "vega-lite";

const createSVG = async () => {
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Line chart.",
    data: {
      values: [
        { dateTime: "07/14/2023 14:59:41.973441437", value: 28, subplot: "wx" },
        { dateTime: "07/14/2023 15:02:21.973435037", value: 55, subplot: "wx" },
        { dateTime: "07/14/2023 16:03:41.973431837", value: 43, subplot: "wx" },
        {
          dateTime: "07/14/2023 17:05:01.973428637",
          value: 91,
          subplot: "nama",
        },
        {
          dateTime: "07/14/2023 18:06:21.973425437",
          value: 81,
          subplot: "nama",
        },
        {
          dateTime: "07/14/2023 19:07:41.973422237",
          value: 53,
          subplot: "nama",
        },
        {
          dateTime: "07/14/2023 20:09:01.973419037",
          value: 19,
          subplot: "nama",
        },
        {
          dateTime: "07/14/2023 21:10:21.973415837",
          value: 87,
          subplot: "nama",
        },
        {
          dateTime: "07/14/2023 22:11:41.973412637",
          value: 52,
          subplot: "nama",
        },
      ],
    },
    facet: {
      row: { field: "subplot", type: "nominal" },
    },
    spec: {
      width: 800,
      mark: "line",
      encoding: {
        x: {
          field: "dateTime",
          type: "temporal",
          scale: {
            domain: ["07/14/2023 14:00:00.000", "07/15/2023 14:00:00.000"],
          },
          axis: { format: "%H" },
        },
        y: { field: "value", type: "quantitative" },
      },
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
    const dateStr = new Date().toISOString();

    return (
      <div>
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svgStr)}`} />
        <p>{dateStr}</p>
      </div>
    );
  } catch (e) {
    return <p>{(e as Error).message}</p>;
  }
};

export default VegaChart;
