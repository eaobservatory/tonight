import { createContext, useContext, ReactNode } from "react";
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

  return (
    <OMPContext.Provider value={{ ompAPIData, ompRefetches }}>
      {children}
    </OMPContext.Provider>
  );
}

export function useOMP() {
  return useContext(OMPContext);
}
