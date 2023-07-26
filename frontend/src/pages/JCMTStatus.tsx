import OldFigure from "../components/OldFigure";

function JCMTStatus() {
  const figures = {
    "HARP Instrument Status": {
      src: "https://www.eao.hawaii.edu/monitoring/images/jcmtharp.png",
    },
    "Namakanui Instrument Status": {
      src: "https://www.eao.hawaii.edu/monitoring/images/jcmtnamakanui.png",
    },
    "SCUBA-2 Instrument Status": {
      src: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2.png",
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

export default JCMTStatus;
