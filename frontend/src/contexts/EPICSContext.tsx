import { createContext, useContext, ReactNode } from "react";
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

  return (
    <EPICSContext.Provider value={{ epicsAPIData, epicsRefetches }}>
      {children}
    </EPICSContext.Provider>
  );
}

export function useEPICS() {
  return useContext(EPICSContext);
}
