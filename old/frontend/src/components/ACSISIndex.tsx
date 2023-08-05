import { useOMP } from "../contexts/OMPContext";
import { dateToTime } from "../utils/date";

interface Observation {
  backend: string;
  obsnum: number;
  utdate: number;
  project: string;
  object: string;
  steptime: number;
  tau225st: number;
  tau225en: number;
  wvmtaust: number;
  wvmtauen: number;
  instrume: string;
  restfreq: number;
  date_obs: string;
  roofsten: string;
  doorsten: string;
}

function ACSISIndex() {
  const { ompAPIData } = useOMP();
  const data = ompAPIData.acsisindex;
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
                <td>{obs.steptime.toFixed(1)}</td>
                <td>{((obs.tau225st + obs.tau225en) / 2).toFixed(2)}</td>
                <td>{((obs.wvmtaust + obs.wvmtauen) / 2).toFixed(2)}</td>
                <td>
                  {obs.instrume}/{obs.restfreq.toFixed(1)}
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

export default ACSISIndex;
