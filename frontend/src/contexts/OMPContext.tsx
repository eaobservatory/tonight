import { createContext, useContext, ReactNode, useEffect } from "react";
import useFetch from "../hooks/useFetch";

interface OMPContextValue {
  ompAPIData: { [key: string]: any };
  ompRefetches: (() => Promise<void>)[];
}

const defaultContextValue: OMPContextValue = {
  ompAPIData: {},
  ompRefetches: [],
};

const OMPContext = createContext<OMPContextValue>(defaultContextValue);

export function OMPProvider({ children }: { children: ReactNode }) {
  const { data: commentsAPIData, refetch: commentsRefetch } = useFetch(
    "http://localhost:3001/api/live/comments"
  );
  const { data: sc2indexAPIData, refetch: sc2indexRefetch } = useFetch(
    "http://localhost:3001/api/live/sc2index"
  );
  const { data: acsisindexAPIData, refetch: acsisindexRefetch } = useFetch(
    "http://localhost:3001/api/live/acsisindex"
  );

  const ompAPIData = {
    comments: commentsAPIData,
    sc2index: sc2indexAPIData,
    acsisindex: acsisindexAPIData,
  };
  const ompRefetches = [commentsRefetch, sc2indexRefetch, acsisindexRefetch];

  // refetch OMP API data to update plots every 5 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      console.log("refetching OMP data @", currentTime.toLocaleString());
      ompRefetches.forEach((refetch) => refetch());
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <OMPContext.Provider value={{ ompAPIData, ompRefetches }}>
      {children}
    </OMPContext.Provider>
  );
}

export function useOMP() {
  return useContext(OMPContext);
}
