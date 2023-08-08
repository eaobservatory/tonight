type Subplot = { [key: string]: string[] }; // {y-axis label: PV variables}
type groups = Subplot[]; // array of Groups, each group is one set of PV variables to plot on same axes (a subplot)

export const jcmtwx: groups = [
  { temperature: ["ws:wxt510:stat:airTemp"] },
  { humidity: ["ws:wxt510:stat:humidity"] },
  { pressure: ["ws:wxt510:stat:pressure"] },
  { "wind speed": ["ws:wxt510:stat:windSpd"] },
  { "wind direction": ["ws:wxt510:stat:windDir"] },
];

export const jcmtnama: groups = [
  {
    temp: [
      "nmnCryo:ls:temp1",
      "nmnCryo:ls:temp2",
      "nmnCryo:ls:temp3",
      "nmnCryo:ls:temp4",
    ],
  },
];
