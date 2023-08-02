import { useOMP } from "../contexts/OMPContext";
import { dateToTime } from "../utils/date";

interface Observation {
  backend: string;
  obsnum: number;
  utdate: number;
  project: string;
  object: string;
  map_wdth: number;
  map_hght: number;
  tau225st: number;
  tau225en: number;
  wvmtaust: number;
  wvmtauen: number;
  seeingst: number;
  seeingen: number;
  roofsten: string;
  date_obs: string;
  doorsten: string;
}

function SC2Index() {
  const { ompAPIData } = useOMP();
  const data = ompAPIData.sc2index;
  // keep only one line per obsnum
  const filteredData = data?.filter(
    (v: Observation, i: number, a: Observation[]) =>
      a.findIndex((t) => t.obsnum === v.obsnum) === i
  );

  return (
    <>
      <table className="table table-bordered index-table">
        <thead>
          <tr>
            <td>Backend</td>
            <td>UT</td>
            <td>Observation</td>
            <td>Project</td>
            <td>Source</td>
            <td>Map</td>
            <td>Tau</td>
            <td>WVM</td>
            <td>Seeing</td>
            <td>Roof</td>
            <td>Doors</td>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((obs: Observation, i: number) => (
              <tr key={i}>
                <td>{obs.backend}</td>
                <td>{dateToTime(obs.date_obs)}</td>
                <td>{obs.obsnum}</td>
                <td>
                  <a
                    href={`https://omp.eao.hawaii.edu/cgi-bin/projecthome.pl?project=${obs.project}`}
                    target="_blank"
                  >
                    {obs.project}
                  </a>
                </td>
                <td>{obs.object}</td>
                <td>
                  {typeof obs.map_wdth === "number" &&
                  typeof obs.map_hght === "number"
                    ? `${(obs.map_wdth / 60).toFixed(1)}' x ${(
                        obs.map_hght / 60
                      ).toFixed(1)}'`
                    : "n/a"}
                </td>
                <td>{((obs.tau225st + obs.tau225en) / 2).toFixed(2)}</td>
                <td>{((obs.wvmtaust + obs.wvmtauen) / 2).toFixed(2)}</td>
                <td>
                  {typeof obs.seeingst == "number" &&
                  typeof obs.seeingen === "number"
                    ? ((obs.seeingst + obs.seeingen) / 2).toFixed(2)
                    : "n/a"}
                </td>
                <td>{obs.roofsten}</td>
                <td>{obs.doorsten}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default SC2Index;
