import Figure from "./Figure";

function TabACSIS() {
  const figures = {
    "HARP Instrument Status": {
      src: "https://www.eao.hawaii.edu/monitoring/images/jcmtharp.png",
    },
    "Namakanui Instrument Status": {
      src: "https://www.eao.hawaii.edu/monitoring/images/jcmtnamakanui.png",
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

export default TabACSIS;
