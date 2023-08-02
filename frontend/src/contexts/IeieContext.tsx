import { createContext, useContext, ReactNode } from "react";
import useFetch from "../hooks/useFetch";

interface IeieContextValue {
  ieieAPIData: { [key: string]: any };
  ieieRefetches: (() => Promise<void>)[];
}

const defaultContextValue: IeieContextValue = {
  ieieAPIData: {},
  ieieRefetches: [],
};

const IeieContext = createContext<IeieContextValue>(defaultContextValue);

export function IeieProvider({ children }: { children: ReactNode }) {
  const { data: jcmtsmuAPIData, refetch: jcmtsmuRefetch } = useFetch(
    "http://localhost:3001/api/live/jcmtsmu"
  );

  const ieieAPIData = { jcmtsmu: jcmtsmuAPIData };
  const ieieRefetches = [jcmtsmuRefetch];

  return (
    <IeieContext.Provider value={{ ieieAPIData, ieieRefetches }}>
      {children}
    </IeieContext.Provider>
  );
}

export function useIeie() {
  return useContext(IeieContext);
}
