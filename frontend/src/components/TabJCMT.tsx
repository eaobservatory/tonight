import Figure from "./Figure";
import useFetch from "../hooks/useFetch";

function TabJCMT() {
  const figures = {
    "EAO Weather": {
      endpoint: "/api/jcmtwx",
    },
    "SMA Phase Monitor": {
      endpoint: "/api/smaphase",
    },
    "MK Opacity": {
      endpoint: "/api/mkopac",
    },
    "JCMT Temperature": {
      endpoint: "/api/jcmttemp",
    },
    "JCMT Camera": {
      endpoint: "/api/jcmt",
    },
    "JCMT Dome": {
      endpoint: "/api/jcmtdome",
    },
    "UKIRT Dome": {
      endpoint: "/api/ukirtdome",
    },
    "JCMT Position": {
      endpoint: "/api/jcmtposn",
    },
    "JCMT SMU (NS)": {
      endpoint: "/api/jcmtsmuns",
    },
    "JCMT SMU (EW)": {
      endpoint: "/api/jcmtsmuew",
    },
    "HARP Instrument Status": {
      endpoint: "/api/jcmtharp",
    },
    "Namakanui Instrument Status": {
      endpoint: "/api/jcmtnamakanui",
    },
    "SCUBA-2 Instrument Status": {
      endpoint: "/api/jcmtsc2",
    },
    "SCUBA-2 Data Reduction Pipeline FCFs": {
      endpoint: "/api/sc2perffcf",
    },
    "SCUBA-2 Data Reduction Pipeline NEFDs": {
      endpoint: "/api/sc2perfnefd",
    },
    "SCUBA-2 Data Reduction Pipeline Flats": {
      endpoint: "/api/sc2perfflat",
    },
    "SCUBA-2 Data Reduction Pipeline Noise": {
      endpoint: "/api/sc2perfnoise",
    },
  };
  const { data, loading, error } = useFetch("http://localhost:3001/api");

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  return (
    <>
      <div>{data?.message}</div>
      <Figure title="test" endpoint="/api/jcmtwx" />
      <div className="figure-container">
        {Object.entries(figures).map(([key, values], index) => (
          <Figure title={key} endpoint={values.endpoint} key={index} />
        ))}
      </div>
    </>
  );
}

export default TabJCMT;
