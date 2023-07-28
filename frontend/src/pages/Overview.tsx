import Figure from "../components/Figure";

function Overview() {
  return (
    <>
      <p>Overview</p>
      <Figure
        title="jcmtnamakanui"
        endpoint="jcmtnamakanui"
        groups={[
          {
            temp: [
              "nmnCryo:ls:temp1",
              "nmnCryo:ls:temp2",
              "nmnCryo:ls:temp3",
              "nmnCryo:ls:temp4",
            ],
          },
        ]}
        mode="lines"
      />
      <Figure
        title="jcmtwx"
        endpoint="jcmtwx"
        groups={[
          { temperature: ["ws:wxt510:stat:airTemp"] },
          { humidity: ["ws:wxt510:stat:humidity"] },
          { pressure: ["ws:wxt510:stat:pressure"] },
          { "wind speed": ["ws:wxt510:stat:windSpd"] },
          { "wind direction": ["ws:wxt510:stat:windDir"] },
        ]}
        mode="lines"
      />
      <Figure
        title="jcmtsc2"
        endpoint="jcmtsc2"
        groups={[
          {
            temp1: [
              "scu2CCS:ls218a:t2",
              "scu2CCS:ls218b:t1",
              "scu2CCS:ls370a:chan1:k",
            ],
          },
          { temp2: ["scu2CCS:ls370c:chan:k"] },
        ]}
        mode="lines"
      />
      <Figure
        title="jcmtsmu"
        endpoint="jcmtsmu"
        groups={[{ ns: ["ns"] }, { ew: ["ew"] }]}
        mode="lines"
      />
    </>
  );
}

export default Overview;
