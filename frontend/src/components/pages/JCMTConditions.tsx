import Figure from "../Figure";

function JCMTConditions() {
  const figures = {
    "EAO Weather": {
      src: "http://www.eao.hawaii.edu/weather/images/jacwx.png",
    },
    "SMA Phase Monitor": {
      src: "http://www.eao.hawaii.edu/weather/images/smaphase.png",
    },
    "MK Opacity": {
      src: "http://www.eao.hawaii.edu/weather/images/mkopac.png",
    },
    "JCMT Temperature": {
      src: "https://www.eao.hawaii.edu/monitoring/images/jcmttemp.png",
    },
    "JCMT Position": {
      src: "https://www.eao.hawaii.edu/monitoring/images/jcmtposn.png",
    },
    "JCMT SMU (NS)": {
      src: "https://www.eao.hawaii.edu/monitoring/secondary/jcmt/jcmtsmu_ns.png",
    },
    "JCMT SMU (EW)": {
      src: "https://www.eao.hawaii.edu/monitoring/secondary/jcmt/jcmtsmu_ew.png",
    },
  };

  return (
    <div className="figure-container">
      {Object.entries(figures).map(([key, values], index) => (
        <Figure title={key} src={values.src} key={index} />
      ))}
    </div>
  );
}

export default JCMTConditions;
