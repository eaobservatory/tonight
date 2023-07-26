import Figure from "../components/Figure";

function Overview() {
  return (
    <>
      <p>Overview</p>
      <Figure title="jcmtnamakanui" endpoint="jcmtnamakanui" mode="lines" />
      <Figure
        title="jcmtwx"
        endpoint="jcmtwx"
        groups={[
          ["ws:wxt510:stat:airTemp"],
          ["ws:wxt510:stat:humidity"],
          ["ws:wxt510:stat:pressure"],
          ["ws:wxt510:stat:windSpd"],
          ["ws:wxt510:stat:windDir"],
        ]}
        mode="lines"
      />
      <Figure
        title="jcmtsc2"
        endpoint="jcmtsc2"
        groups={[
          ["scu2CCS:ls218a:t2", "scu2CCS:ls218b:t1", "scu2CCS:ls370a:chan1:k"],
          ["scu2CCS:ls370c:chan:k"],
        ]}
        mode="lines"
      />
    </>
  );
}

export default Overview;
