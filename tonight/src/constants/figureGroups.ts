type Subplot = { [key: string]: string[] }; // {y-axis label: PV variables}
type groups = Subplot[]; // array of Groups, each group is one set of PV variables to plot on same axes (a subplot)

export const jcmtwx: groups = [
  { Temperature: ["ws:wxt510:stat:airTemp"] },
  { Humidity: ["ws:wxt510:stat:humidity"] },
  { Pressure: ["ws:wxt510:stat:pressure"] },
  { "Wind speed": ["ws:wxt510:stat:windSpd"] },
  { "Wind direction": ["ws:wxt510:stat:windDir"] },
];

export const jcmtnama: groups = [
  {
    "Temperature (k)": [
      "nmnCryo:ls:temp1",
      "nmnCryo:ls:temp2",
      "nmnCryo:ls:temp3",
      "nmnCryo:ls:temp4",
    ],
  },
];
