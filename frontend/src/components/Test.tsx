import Figure from "./Figure";

function Test() {
  const figures = {
    "EAO Weather": {
      endpoint: "/api/live/jcmtwx",
    },
    "SMA Phase Monitor": {
      endpoint: "/api/live/smaphase",
    },
    "MK Opacity": {
      endpoint: "/api/live/mkopac",
    },
    "JCMT Temperature": {
      endpoint: "/api/live/jcmttemp",
    },
    "JCMT Camera": {
      endpoint: "/api/live/jcmtcam",
    },
    "JCMT Dome": {
      endpoint: "/api/live/jcmtdome",
    },
    "UKIRT Dome": {
      endpoint: "/api/live/ukirtdome",
    },
    "JCMT Position": {
      endpoint: "/api/live/jcmtposn",
    },
    "JCMT SMU (NS)": {
      endpoint: "/api/live/jcmtsmuns",
    },
    "JCMT SMU (EW)": {
      endpoint: "/api/live/jcmtsmuew",
    },
    "HARP Instrument Status": {
      endpoint: "/api/live/jcmtharp",
    },
    "Namakanui Instrument Status": {
      endpoint: "/api/live/jcmtnamakanui",
    },
    "SCUBA-2 Instrument Status": {
      endpoint: "/api/live/jcmtsc2",
    },
    "SCUBA-2 Data Reduction Pipeline FCFs": {
      endpoint: "/api/live/sc2perffcf",
    },
    "SCUBA-2 Data Reduction Pipeline NEFDs": {
      endpoint: "/api/live/sc2perfnefd",
    },
    "SCUBA-2 Data Reduction Pipeline Flats": {
      endpoint: "/api/live/sc2perfflat",
    },
    "SCUBA-2 Data Reduction Pipeline Noise": {
      endpoint: "/api/live/sc2perfnoise",
    },
  };

  return (
    <>
      <Figure title="test" endpoint="/api/live/jcmtwx" />
      {/* <div className="figure-container">
        {Object.entries(figures).map(([key, values], index) => (
          <Figure title={key} endpoint={values.endpoint} key={index} />
        ))}
      </div> */}
    </>
  );
}

export default Test;
