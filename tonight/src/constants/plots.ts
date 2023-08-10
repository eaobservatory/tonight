type Subplot = { [key: string]: string[] }; // {y-axis label: PV variables} -- pv variables to plot on the same y-axis
type Plot = Subplot[]; // array of subplots to plot on the same x-axis

export const plots: { [key: string]: Subplot[] } = {};

const jcmtwx: Plot = [
  { Temperature: ["ws:wxt510:stat:airTemp"] },
  { Humidity: ["ws:wxt510:stat:humidity"] },
  { Pressure: ["ws:wxt510:stat:pressure"] },
  { "Wind speed": ["ws:wxt510:stat:windSpd"] },
  { "Wind direction": ["ws:wxt510:stat:windDir"] },
];
plots["jcmtwx"] = jcmtwx;

const jcmtnama: Plot = [
  {
    "Temperature (k)": [
      "nmnCryo:ls:temp1",
      "nmnCryo:ls:temp2",
      "nmnCryo:ls:temp3",
      "nmnCryo:ls:temp4",
    ],
  },
];
plots["jcmtnama"] = jcmtnama;

export const labels: { [key: string]: string } = {
  // jcmtwx
  "ws:wxt510:stat:airTemp": "temperature",
  "ws:wxt510:stat:humidity": "relative humidity",
  "ws:wxt510:stat:pressure": "barometric pressure",
  "ws:wxt510:stat:windSpd": "wind speed",
  "ws:wxt510:stat:windDir": "wind direction",
  "enviro:dewpoint": "dew point",
  // jcmtnama
  "nmnCryo:ls:temp1": "cold head 2nd stage (<3.5 K)",
  "nmnCryo:ls:temp2": "4k plate (<4.2 K)",
  "nmnCryo:ls:temp3": "cold head 1st stage (< 22 K)",
  "nmnCryo:ls:temp4": "outer shield (< 100 K)",
};
