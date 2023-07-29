import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import Overview from "./pages/Overview";
import JCMTConditions from "./pages/JCMTConditions";
import JCMTStatus from "./pages/JCMTStatus";
import JCMTCameras from "./pages/JCMTCameras";
import ObservingACSIS from "./pages/ObservingACSIS";
import ObservingSCUBA2 from "./pages/ObservingSCUBA2";
import ObservingAll from "./pages/ObservingAll";
import QAACSIS from "./pages/QAACSIS";
import QASCUBA2 from "./pages/QASCUBA2";

export const TabContext = React.createContext<{
  activeTab: number;
  handlePageClick: (tab: number, path: string) => void;
} | null>(null);

// Contains API data that queries the engarchive (i.e., EPICS data)
export const EPICSContext = React.createContext({
  jcmtwxAPIData: null,
  jcmtsc2APIData: null,
  jcmtnamakanuiAPIData: null,
  jcmtsmuAPIData: null,
});

function App() {
  const navigate = useNavigate();

  // TabContext
  const [activeTab, setActiveTab] = useState(0);
  const handlePageClick = useCallback(
    (tab: number, path: string) => {
      setActiveTab(tab);
      navigate(path);
    },
    [navigate]
  );

  // EPICSContext -- allows data to be fetched once and passed to all components
  const { data: jcmtwxAPIData, refetch: jcmtwxRefetch } = useFetch(
    "http://localhost:3001/api/live/jcmtwx"
  );
  const { data: jcmtsc2APIData, refetch: jcmtsc2Refetch } = useFetch(
    "http://localhost:3001/api/live/jcmtsc2"
  );
  const { data: jcmtnamakanuiAPIData, refetch: jcmtnamakanuiRefetch } =
    useFetch("http://localhost:3001/api/live/jcmtnamakanui");
  const { data: jcmtsmuAPIData, refetch: jcmtsmuRefetch } = useFetch(
    "http://localhost:3001/api/live/jcmtsmu"
  );

  const refetches = [
    jcmtwxRefetch,
    jcmtsc2Refetch,
    jcmtnamakanuiRefetch,
    jcmtsmuRefetch,
  ];

  // refetch API data to update plots every 5 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      console.log("refetching API data @", currentTime.toLocaleString());
      refetches.forEach((refetch) => refetch());
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId); // cleanup on unmount
  }, [refetches]);

  return (
    <div>
      <TabContext.Provider value={{ activeTab, handlePageClick }}>
        <Navbar />
        <Tabs />
      </TabContext.Provider>
      <EPICSContext.Provider
        value={{
          jcmtwxAPIData,
          jcmtsc2APIData,
          jcmtnamakanuiAPIData,
          jcmtsmuAPIData,
        }}
      >
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/jcmtconditions" element={<JCMTConditions />} />
          <Route path="/jcmtstatus" element={<JCMTStatus />} />
          <Route path="/jcmtcameras" element={<JCMTCameras />} />
          <Route path="/observingacsis" element={<ObservingACSIS />} />
          <Route path="/observingscuba2" element={<ObservingSCUBA2 />} />
          <Route path="/observingall" element={<ObservingAll />} />
          <Route path="/qaacsis" element={<QAACSIS />} />
          <Route path="/qascuba2" element={<QASCUBA2 />} />
        </Routes>
      </EPICSContext.Provider>
    </div>
  );
}

export default App;
