import * as vega from "vega";
import * as lite from "vega-lite";
import { plots, titles } from "@/constants/plots";
import { getPV } from "@/utils/engarchive";
import { getDateArray, getPrevDay } from "@/utils/date";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  plot: string;
  mark: string;
  date: string;
}

interface Value {
  dateTime: string;
  value: string;
  subplot: string;
  label: string;
}

const cleanPVData = (pvData: { [key: string]: any }) => {
  // remove 0s
  const removeZero = (pv: string) => {
    if (pvData[pv]) {
      const data = pvData[pv]["data"];
      for (let i = 0; i < data.length; i++) {
        const line = data[i];
        const point = line.split("\t");
        if (Number(point[1]) == 0) {
          data.splice(i, 1);
          i--;
        }
      }
    }
  };

  // jcmtweather
  removeZero("ws:wxt510:stat:airTemp");
  removeZero("ws:wxt510:stat:pressure");
  removeZero("ws:wxt510:stat:humidity");

  //jcmtscuba2
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

const createSpec = async (
  plot: string,
  mark: string,
  date: string,
  pvData: { [key: string]: any }
) => {
  let dateArray;
  if (date == "live") {
    dateArray = getDateArray();
  } else {
    dateArray = [getPrevDay(date), date.split("-")];
  }
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
            const value = {
              dateTime: point[0],
              value: point[1],
              subplot: subplotName,
              label: label,
            };
            values.push(value);
          }
        }
      }
    }
  }

  // value of datum seems to depend on the first layer's x field
  vega.expressionFunction("utcFormatter", function (datum: Date) {
    const hstHour = String(datum).substring(16, 18);
    let utcHour = Number(hstHour) + 10;
    if (utcHour >= 24) {
      utcHour -= 24;
    }
    const hourStr = utcHour.toString().padStart(2, "0");
    return hourStr;
  });

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
                  `${dateArray[0][0]}-${dateArray[0][1]}-${dateArray[0][2]}T14:00:00.000`,
                  `${dateArray[1][0]}-${dateArray[1][1]}-${dateArray[1][2]}T14:00:00.000`,
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
        },
        // transparent layer for UTC axis labels
        {
          mark: { type: "point", opacity: 0, clip: true },
          encoding: {
            x: {
              field: "dateTime",
              type: "temporal",
              axis: {
                formatType: "utcFormatter",
                title: "Time (UTC)",
                titlePadding: 10,
                orient: "top",
              },
            },
          },
        },
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

const createPopoverContent = (pvData: { [key: string]: any }) => {
  return (
    <>
      {Object.keys(pvData).map((pv: string) => {
        const { label, data } = pvData[pv];
        let mostRecentValue;
        try {
          mostRecentValue = data[data.length - 1].split("\t")[1];
        } catch (e) {
          mostRecentValue = "n/a";
        }
        return (
          <p className="text-sm">
            {label}: {mostRecentValue}
          </p>
        );
      })}
    </>
  );
};

export default async function VegaChart({ plot, mark, date }: Props) {
  try {
    const pvData = await getPVData(plot, date);
    const svgStr = await createSpec(plot, mark, date, pvData);
    const popoverContent = createPopoverContent(pvData);
    const ymd = getDateArray()[2].join("-");

    const dateObj = new Date();
    const timeStr =
      dateObj.getHours() + ":" + String(dateObj.getMinutes()).padStart(2, "0");
    const dataStr = JSON.stringify(pvData, null, 2);

    return (
      <div>
        <p>{timeStr}</p>
        <span>{titles[plot]}</span>
        <Popover>
          <PopoverTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoCircledIcon />
                </TooltipTrigger>
                <TooltipContent>
                  Get snapshot of most recent values
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </PopoverTrigger>
          <PopoverContent>{popoverContent}</PopoverContent>
        </Popover>
        {date == "live" ? (
          <a className="inline-block" href={`/plots/${plot}?date=${ymd}`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ArchiveIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Link to today's archive</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </a>
        ) : null}
        <Image
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgStr)}`}
          alt={plot}
          style={{
            width: "50%",
          }}
          width={200} // overridden by style
          height={100} // overridden by style
        />
        <pre style={{ fontSize: "10px" }}>{dataStr}</pre>
      </div>
    );
  } catch (e) {
    return (
      <>
        <p>Error rendering plot: {(e as Error).message}</p>
      </>
    );
  }
}
