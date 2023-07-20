import Figure from "../Figure";

function JCMTStatus() {
  const figures = {
    "HARP Instrument Status": {
      endpoint: "/api/live/jcmtharp",
    },
    "Namakanui Instrument Status": {
      endpoint: "/api/live/jcmtnamakanui",
    },
    "SCUBA-2 Instrument Status": {
      endpoint: "/api/live/jcmtsc2",
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

export default JCMTStatus;
