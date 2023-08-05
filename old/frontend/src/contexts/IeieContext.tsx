import { createContext, useContext, ReactNode, useEffect } from "react";
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

  // refetch ieie API data to update plots every 5 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      console.log("refetching ieie data @", currentTime.toLocaleString());
      ieieRefetches.forEach((refetch) => refetch());
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <IeieContext.Provider value={{ ieieAPIData, ieieRefetches }}>
      {children}
    </IeieContext.Provider>
  );
}

export function useIeie() {
  return useContext(IeieContext);
}
