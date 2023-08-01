import { useContext } from "react";
import { dateToTime } from "../utils/date";
import { APIContext } from "../App";

interface Observation {
  backend: string;
  obsnum: number;
  utdate: number;
  project: string;
  object: string;
  steptime: number;
  tau225en: number;
  wvmtauen: number;
  instrume: string;
  restfreq: number;
  date_obs: string;
  roofsten: string;
}

function ACSISIndex() {
  const contextValue = useContext(APIContext) ?? {};
  const data = contextValue.acsisindexAPIData
    ? (contextValue.acsisindexAPIData as Observation[])
    : [];
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
            <td>Steptime</td>
            <td>Tau</td>
            <td>WVM</td>
            <td>Rx/Freq</td>
            <td>Dome</td>
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
                <td>{obs.steptime.toFixed(1)}</td>
                <td>{obs.tau225en.toFixed(2)}</td>
                <td>{obs.wvmtauen.toFixed(2)}</td>
                <td>
                  {obs.instrume}/{obs.restfreq.toFixed(1)}
                </td>
                <td>{obs.roofsten}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ACSISIndex;
