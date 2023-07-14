import Figure from "./Figure";

function TabJCMT() {
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
    "JCMT Camera": {
      src: "http://www.eao.hawaii.edu/weather/images/jcmt.jpg",
    },
    "JCMT Dome": {
      src: "http://www.eao.hawaii.edu/weather/images/jcmtdome.jpg",
    },
    "UKIRT Dome": {
      src: "http://www.eao.hawaii.edu/weather/images/ukirtdome.jpg",
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

export default TabJCMT;
