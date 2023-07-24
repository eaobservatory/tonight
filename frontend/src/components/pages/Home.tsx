import Figure from "../Figure";

function Home() {
  return (
    <>
      <Figure title="jcmtnamakanui" endpoint="/api/live/jcmtnamakanui" />
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
      <Figure
        title="jcmtsc2"
        endpoint="/api/live/jcmtsc2"
        groups={[
          ["scu2CCS:ls218a:t2", "scu2CCS:ls218b:t1", "scu2CCS:ls370a:chan1:k"],
          ["scu2CCS:ls370c:chan:k"],
        ]}
      />
    </>
  );
}

export default Home;
