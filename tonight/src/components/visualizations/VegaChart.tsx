import * as vega from "vega";
import * as lite from "vega-lite";
import { plots, titles } from "@/constants/plots";
import { getPV } from "@/utils/engarchive";
import { getDateArray, getPrevDay } from "@/utils/date";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

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

interface SkeletonProps {
  plot: string;
}

// const cleanPVData = (pvData: { [key: string]: any }) => {
//   // remove 0s
//   const removeZero = (pv: string) => {
//     if (pvData[pv]) {
//       const data = pvData[pv]["data"];
//       for (let i = 0; i < data.length; i++) {
//         const line = data[i];
//         const point = line.split("\t");
//         if (Number(point[1]) == 0) {
//           data.splice(i, 1);
//           i--;
//         }
//       }
//     }
//   };

//   // jcmtweather
//   removeZero("ws:wxt510:stat:airTemp");
//   removeZero("ws:wxt510:stat:pressure");
//   removeZero("ws:wxt510:stat:humidity");

//   //jcmtscuba2
//   removeZero("scu2CCS:ls370c:chan:k");
// };

const getPVData = async (plot: string, date: string) => {
  const pvData: { [key: string]: any } = {};
  for (const subplot of plots[plot]) {
    for (const pvs of Object.values(subplot)) {
      for (const pv of pvs) {
        pvData[pv] = await getPV(pv, date);
      }
    }
  }
  // cleanPVData(pvData);
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
  let values: Value[] = [];
  const numSubplots = plots[plot].length;

  // populate values array to pass into spec
  for (const subplot of plots[plot]) {
    const subplotName = Object.keys(subplot)[0];
    for (const pvs of Object.values(subplot)) {
      for (const pv of pvs) {
        const { label, data } = pvData[pv];
        if (data.length != 0) {
          for (const line of data) {
            const point = line.split("\t");
            // if (!point[1].startsWith(" ")) {
            const value = {
              dateTime: point[0],
              value: point[1],
              subplot: subplotName,
              label: label,
            };
            values.push(value);
            // }
          }
        } else {
          // if no data, add placeholder value
          const value = {
            dateTime: "1970-01-01T00:00:00.000",
            value: "0",
            subplot: subplotName,
            label: label,
          };
          values.push(value);
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
        // transparent layer for UTC axis labels and right y axis
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
            y: {
              field: "value",
              type: "quantitative",
              axis: { title: "\t", orient: "right" },
              scale: { zero: false },
            },
          },
        },
      ],
      resolve: {
        axis: { x: "independent", y: "independent" },
      },
    },
    resolve: {
      scale: { y: "independent" },
    },
  } as unknown as lite.TopLevelSpec;

  const config = {
    config: {
      customFormatTypes: true,
      lineBreak: "\n",
      facet: { spacing: 0 },
    },
  };

  const vegaspec = lite.compile(spec, config).spec;
  const view = new vega.View(vega.parse(vegaspec), { renderer: "none" });
  const svgStr = await view.toSVG();
  return svgStr;
};

const createPopoverContent = (pvData: { [key: string]: any }) => {
  return (
    <Table>
      <TableBody>
        {Object.keys(pvData).map((pv: string) => {
          const { label, data } = pvData[pv];
          let mostRecentValue;
          try {
            mostRecentValue = data[data.length - 1].split("\t")[1];
            mostRecentValue = Number(mostRecentValue).toFixed(1);
          } catch (e) {
            mostRecentValue = "n/a";
          }
          return (
            <TableRow>
              <TableCell className="border">{label}</TableCell>
              <TableCell className="border">{mostRecentValue}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export async function VegaChart({ plot, mark, date }: Props) {
  try {
    const pvData = await getPVData(plot, date);
    const svgStr = await createSpec(plot, mark, date, pvData);
    const popoverContent = createPopoverContent(pvData);
    const ymd = getDateArray()[2].join("-");

    const dataStr = JSON.stringify(pvData, null, 2);

    return (
      <>
        <div className="w-auto border py-4 pr-1 m-1">
          <div className="flex justify-center space-x-1">
            <p className="whitespace-nowrap">{titles[plot]}</p>
            <Popover>
              <PopoverTrigger>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoCircledIcon />
                    </TooltipTrigger>
                    <TooltipContent>See most recent values</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                {popoverContent}
              </PopoverContent>
            </Popover>
            {date == "live" ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={`/plots/${plot}?date=${ymd}`}>
                      <ArchiveIcon />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Link to today's archive</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
          </div>
          <Link
            href={`/plots/${plot}` + (date == "live" ? "" : `?date=${date}`)}
          >
            <Image
              src={`data:image/svg+xml;utf8,${encodeURIComponent(svgStr)}`}
              alt={plot}
              className="w-full"
              width={200} // overridden by className
              height={100} // overridden by className
            />
          </Link>
        </div>
        {/* <div>
          <pre style={{ fontSize: "10px" }}>{dataStr}</pre>
        </div> */}
      </>
    );
  } catch (e) {
    return (
      <div className="m-1 flex flex-col items-center border aspect-[8/5] pt-4 pb-6">
        <p>Error rendering {titles[plot]}--</p>
        <p>{(e as Error).message}</p>
      </div>
    );
  }
}

export function VegaChartSkeleton({ plot }: SkeletonProps) {
  return (
    <div className="m-1 flex flex-col items-center border aspect-[8/5] pt-4 pb-6">
      <p className="whitespace-nowrap">{titles[plot]}</p>
      <div className="w-full h-full px-5 mt-2">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
    </div>
  );
}
