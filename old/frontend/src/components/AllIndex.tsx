import { useEffect, useState } from "react";
import { useOMP } from "../contexts/OMPContext";

function AllIndex() {
  const { ompAPIData } = useOMP();

  // get and filter sc2 data (one line per obsnum)
  const sc2Data = ompAPIData.sc2index;
  const sc2FilteredData = sc2Data?.filter(
    (v: any, i: number, a: any[]) =>
      a.findIndex((t) => t.obsnum === v.obsnum) === i
  );

  // get and filter acsis data (one line per obsnum)
  const acsisData = ompAPIData.acsisindex;
  const acsisFilteredData = acsisData?.filter(
    (v: any, i: number, a: any[]) =>
      a.findIndex((t) => t.obsnum === v.obsnum) === i
  );
  const [allData, setAllData] = useState<any[]>([]);

  // Merge and sort data
  useEffect(() => {
    if (sc2FilteredData && acsisFilteredData) {
      const mergedData = [...sc2FilteredData, ...acsisFilteredData];
      const sortedData = mergedData.sort(
        (a, b) =>
          new Date(b.date_obs).getTime() - new Date(a.date_obs).getTime()
      );
      setAllData(sortedData);
    }
  }, [sc2Data, acsisData]);

  return (
    <>
      <table className="table table-bordered index-table">
        <tbody>
          {allData.map((obs, i) => (
            <tr key={i}>
              {Object.keys(obs).map((key, j) => (
                <td key={j}>{obs[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AllIndex;
