import Figure from "../Figure";

function SCUBA2Performance() {
  const figures = {
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

  return (
    <div className="figure-container">
      {Object.entries(figures).map(([key, values], index) => (
        <Figure title={key} endpoint={values.endpoint} key={index} />
      ))}
    </div>
  );
}

export default SCUBA2Performance;
