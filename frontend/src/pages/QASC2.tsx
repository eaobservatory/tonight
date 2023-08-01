import OldFigure from "../components/OldFigure";

function QASC2() {
  const figures = {
    "SCUBA-2 Data Reduction Pipeline FCFs": {
      src: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2perffcf.png",
    },
    "SCUBA-2 Data Reduction Pipeline NEFDs": {
      src: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2perfnefd.png",
    },
    "SCUBA-2 Data Reduction Pipeline Flats": {
      src: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2perfflat.png",
    },
    "SCUBA-2 Data Reduction Pipeline Noise": {
      src: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2perfnoise.png",
    },
  };

  return (
    <div className="figure-container">
      {Object.entries(figures).map(([key, values], index) => (
        <OldFigure title={key} src={values.src} key={index} />
      ))}
    </div>
  );
}

export default QASC2;
