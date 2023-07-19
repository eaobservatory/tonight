import Figure from "../Figure";

function JCMTConditions() {
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
    "JCMT Position": {
      endpoint: "/api/jcmtposn",
    },
    "JCMT SMU (NS)": {
      endpoint: "/api/jcmtsmuns",
    },
    "JCMT SMU (EW)": {
      endpoint: "/api/jcmtsmuew",
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

export default JCMTConditions;
