type Subplot = { [key: string]: string[] }; // {y-axis label: PV variables} -- pv variables to plot on the same y-axis
type Plot = Subplot[]; // array of subplots to plot on the same x-axis

export const plots: { [key: string]: Subplot[] } = {};

const jcmtwx: Plot = [
  { "Temperature\n(deg C)": ["ws:wxt510:stat:airTemp"] },
  { "Relative Humidity\n(pct)": ["ws:wxt510:stat:humidity"] },
  { "Barometric Pressure\n(mbar)": ["ws:wxt510:stat:pressure"] },
  { "Wind Speed\n(mph)": ["ws:wxt510:stat:windSpd"] },
  { "Wind Direction \n(deg)": ["ws:wxt510:stat:windDir"] },
];
plots["jcmtwx"] = jcmtwx;

const jcmtsc2: Plot = [
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
plots["jcmtsc2"] = jcmtsc2;

const jcmtnama: Plot = [
  {
    "Temperature (K)": [
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
  "ws:wxt510:stat:airTemp": "temperature\n(deg C)",
  "ws:wxt510:stat:humidity": "relative humidity\n(pct)",
  "ws:wxt510:stat:pressure": "barometric pressure\n(mbar)",
  "ws:wxt510:stat:windSpd": "wind speed\n(mph)",
  "ws:wxt510:stat:windDir": "wind direction\n(deg)",
  "enviro:dewpoint": "dew point",
  // jcmtsc2
  "scu2CCS:ls218a:t2": "60k shield ptc near\n(< 41.0 K)",
  "scu2CCS:ls218b:t1": "4k box ptc near\n(< 4.8 K)",
  "scu2CCS:ls370a:chan1:k": "still\n(< 1.0 K)",
  "scu2CCS:ls370c:chan:k": "mix chamb\n(< 0.105 K)",
  // jcmtnama
  "nmnCryo:ls:temp1": "cold head 2nd stage\n(<3.5 K)",
  "nmnCryo:ls:temp2": "4k plate\n(<4.2 K)",
  "nmnCryo:ls:temp3": "cold head 1st stage\n(< 22 K)",
  "nmnCryo:ls:temp4": "outer shield\n(< 100 K)",
};

export const titles: { [key: string]: string } = {
  jcmtwx: "JCMT Weather",
  jcmtsc2: "JCMT SCUBA-2 Instrument Status",
  jcmtnama: "JCMT Namakanui Instrument Status",
};
