// Steps to add a new plot:
// 1. Create a constant with subplots/pv variables to plot
// 2. Add the constant to the plots object
// 3. Add labels for each pv variable to the labels object
// 4. Add a title for the plot to the titles object

type Subplot = { [key: string]: string[] }; // {y-axis label: PV variables} -- pv variables to plot on the same y-axis
type Plot = Subplot[]; // array of subplots to plot on the same x-axis

export const plots: { [key: string]: Subplot[] } = {};

const jcmtweather: Plot = [
  { "Temperature\n(deg C)": ["ws:wxt510:stat:airTemp"] },
  { "Humidity\n(pct)": ["ws:wxt510:stat:humidity"] },
  { "Pressure\n(mbar)": ["ws:wxt510:stat:pressure"] },
  { "Wind Speed\n(mph)": ["ws:wxt510:stat:windSpd"] },
  { "Wind Direction\n(deg)": ["ws:wxt510:stat:windDir"] },
];
plots["jcmtweather"] = jcmtweather;

const jcmtscuba2: Plot = [
  {
    "Temperature (K)": [
      "scu2CCS:ls218a:t2",
      "scu2CCS:ls218b:t1",
      "scu2CCS:ls370a:chan1:k",
    ],
  },
  {
    "Temperature (K)\t": ["scu2CCS:ls370c:chan:k"], // \t for Vega to differentiate subplots
  },
];
plots["jcmtscuba2"] = jcmtscuba2;

const jcmtharp: Plot = [
  {
    "Temperature (K)": [
      "conb:cryo:ls1:d60:val",
      "conb:cryo:ls2:t60:val",
      "conb:cryo:ls2:int:val",
      "conb:cryo:ls2:c60:val",
      "conb:cryo:ls2:ln2:val",
      "conb:cryo:ls1:c20:val",
      "conb:cryo:ls1:d20:val",
      "conb:cryo:ls2:cst:val",
      "conb:cryo:ls2:ssb:val",
      "conb:cryo:ls1:mxl:val",
      "conb:cryo:ls1:mxr:val",
      "conb:cryo:ls1:dai:val",
      "conb:cryo:ls1:am6:val",
    ],
  },
];
plots["jcmtharp"] = jcmtharp;

const jcmtnamakanui: Plot = [
  {
    "Temperature (K)": [
      "nmnCryo:ls:temp1",
      "nmnCryo:ls:temp2",
      "nmnCryo:ls:temp3",
      "nmnCryo:ls:temp4",
    ],
  },
];
plots["jcmtnamakanui"] = jcmtnamakanui;

const jcmttemperature: Plot = [
  {
    "Temperature (deg C)": [
      "ws:wxt510:stat:airTemp",
      "well:hmp230:airTemp",
      "enviro:opto:back",
      "enviro:opto:front",
      "enviro:opto:llr:real",
      "enviro:opto:lrr:real",
      "enviro:opto:ulr:real",
      "enviro:opto:urr:real",
      "enviro:opto:llf:real",
      "enviro:opto:lrf:real",
      "enviro:opto:ulf:real",
      "enviro:opto:urf:real",
    ],
  },
];
plots["jcmttemperature"] = jcmttemperature;

const jcmtposition: Plot = [
  { "Azimuth (deg)": ["mount:az:enc"] },
  { "Elevation (deg)": ["mount:el:enc"] },
];
plots["jcmtposition"] = jcmtposition;

export const labels: { [key: string]: string } = {
  // jcmtweather
  "ws:wxt510:stat:airTemp": "temperature\n(deg C)",
  "ws:wxt510:stat:humidity": "relative humidity\n(pct)",
  "ws:wxt510:stat:pressure": "barometric pressure\n(mbar)",
  "ws:wxt510:stat:windSpd": "wind speed\n(mph)",
  "ws:wxt510:stat:windDir": "wind direction\n(deg)",
  "enviro:dewpoint": "dew point",
  // jcmtscuba2
  "scu2CCS:ls218a:t2": "60k shield ptc near\n(< 41.0 K)",
  "scu2CCS:ls218b:t1": "4k box ptc near\n(< 4.8 K)",
  "scu2CCS:ls370a:chan1:k": "still\n(< 1.0 K)",
  "scu2CCS:ls370c:chan:k": "mix chamb\n(< 0.105 K)",
  // jcmtharp
  "conb:cryo:ls1:d60:val": "daikin 60k top (K)",
  "conb:cryo:ls2:t60:val": "top cti 60k (K)",
  "conb:cryo:ls2:int:val": "interfer (K)",
  "conb:cryo:ls2:c60:val": "bot cti 60k (K)",
  "conb:cryo:ls2:ln2:val": "ln2 heat pad (K)",
  "conb:cryo:ls1:c20:val": "ext 20k can (K)",
  "conb:cryo:ls1:d20:val": "daikin 20k top (K)",
  "conb:cryo:ls2:cst:val": "cold stop c1 (K)",
  "conb:cryo:ls2:ssb:val": "ssb dump (K)",
  "conb:cryo:ls1:mxl:val": "mix block lhs (K)",
  "conb:cryo:ls1:mxr:val": "mix block rhs (K)",
  "conb:cryo:ls1:dai:val": "daikin head (K)",
  "conb:cryo:ls1:am6:val": "if amp stg (K)",
  // jcmtnamakanui
  "nmnCryo:ls:temp1": "cold head 2nd stage\n(<3.5 K)",
  "nmnCryo:ls:temp2": "4k plate\n(<4.2 K)",
  "nmnCryo:ls:temp3": "cold head 1st stage\n(< 22 K)",
  "nmnCryo:ls:temp4": "outer shield\n(< 100 K)",
  // jcmttemperature
  // "ws:wxt510:stat:airTemp": "air temp (deg C)",
  "well:hmp230:airTemp": "dome temp (deg C)",
  "enviro:opto:back": "mean back leg (deg C)",
  "enviro:opto:front": "mean front leg (deg C)",
  "enviro:opto:llr:real": "lower left back leg (deg C)",
  "enviro:opto:lrr:real": "lower right back leg (deg C)",
  "enviro:opto:ulr:real": "upper left back leg (deg C)",
  "enviro:opto:urr:real": "upper right back leg (deg C)",
  "enviro:opto:llf:real": "lower left front leg (deg C)",
  "enviro:opto:lrf:real": "lower right front leg (deg C)",
  "enviro:opto:ulf:real": "upper left front leg (deg C)",
  "enviro:opto:urf:real": "upper right front leg (deg C)",
  // jcmtposition
  "mount:az:enc": "azimuth\n(deg)",
  "mount:el:enc": "elevation\n(deg",
};

export const titles: { [key: string]: string } = {
  jcmtweather: "JCMT Weather",
  jcmtscuba2: "JCMT SCUBA-2 Instrument Status",
  jcmtharp: "JCMT HARP Instrument Status",
  jcmtnamakanui: "JCMT Namakanui Instrument Status",
  jcmttemperature: "JCMT Temperature",
  jcmtposition: "JCMT Position",
};
