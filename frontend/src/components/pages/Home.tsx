import Figure from "../Figure";

function Home() {
  return (
    <>
      <Figure
        title="jcmtnamakanui"
        endpoint="/api/live/jcmtnamakanui"
        // groups={[
        //   ["nmnCryo:ls:temp4"],
        //   ["nmnCryo:ls:temp3", "nmnCryo:ls:temp1", "nmnCryo:ls:temp2"],
        // ]}
      />
      <Figure
        title="jcmtwx"
        endpoint="/api/live/jcmtwx"
        groups={[
          ["ws:wxt510:stat:airTemp"],
          ["ws:wxt510:stat:humidity"],
          ["ws:wxt510:stat:pressure"],
          ["ws:wxt510:stat:windSpd"],
          ["ws:wxt510:stat:windDir"],
        ]}
      />
    </>
  );
}

export default Home;
