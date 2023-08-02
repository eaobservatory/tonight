import { createContext, useContext, ReactNode, useEffect } from "react";
import useFetch from "../hooks/useFetch";

interface EPICSContextValue {
  epicsAPIData: { [key: string]: any };
  epicsRefetches: (() => Promise<void>)[];
}

const defaultContextValue: EPICSContextValue = {
  epicsAPIData: {},
  epicsRefetches: [],
};

const EPICSContext = createContext<EPICSContextValue>(defaultContextValue);

export function EPICSProvider({ children }: { children: ReactNode }) {
  const { data: jcmtwxAPIData, refetch: jcmtwxRefetch } = useFetch(
    "http://localhost:3001/api/live/jcmtwx"
  );
  const { data: jcmtsc2APIData, refetch: jcmtsc2Refetch } = useFetch(
    "http://localhost:3001/api/live/jcmtsc2"
  );
  const { data: jcmtnamaAPIData, refetch: jcmtnamaRefetch } = useFetch(
    "http://localhost:3001/api/live/jcmtnama"
  );

  const epicsAPIData = {
    jcmtwx: jcmtwxAPIData,
    jcmtsc2: jcmtsc2APIData,
    jcmtnama: jcmtnamaAPIData,
  };
  const epicsRefetches = [jcmtwxRefetch, jcmtsc2Refetch, jcmtnamaRefetch];

  // refetch EPICS API data to update plots every 5 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      console.log("refetching EPICS data @", currentTime.toLocaleString());
      epicsRefetches.forEach((refetch) => refetch());
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <EPICSContext.Provider value={{ epicsAPIData, epicsRefetches }}>
      {children}
    </EPICSContext.Provider>
  );
}

export function useEPICS() {
  return useContext(EPICSContext);
}
