import OldFigure from "../OldFigure";

function JCMTConditions() {
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
    "JCMT Position": {
      endpoint: "/api/live/jcmtposn",
    },
    "JCMT SMU (NS)": {
      endpoint: "/api/live/jcmtsmuns",
    },
    "JCMT SMU (EW)": {
      endpoint: "/api/live/jcmtsmuew",
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

export default JCMTConditions;
