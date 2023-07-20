import OldFigure from "../OldFigure";

function SCUBA2Performance() {
  const figures = {
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
    <div className="figure-container">
      {Object.entries(figures).map(([key, values], index) => (
        <OldFigure title={key} endpoint={values.endpoint} key={index} />
      ))}
    </div>
  );
}

export default SCUBA2Performance;
