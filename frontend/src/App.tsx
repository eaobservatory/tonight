import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import Overview from "./pages/Overview";
import JCMTConditions from "./pages/JCMTConditions";
import JCMTStatus from "./pages/JCMTStatus";
import JCMTCameras from "./pages/JCMTCameras";
import ObservingACSIS from "./pages/ObservingACSIS";
import ObservingSC2 from "./pages/ObservingSC2";
import ObservingAll from "./pages/ObservingAll";
import QAACSIS from "./pages/QAACSIS";
import QASC2 from "./pages/QASC2";

export const TabContext = React.createContext<{
  activeTab: number;
  handlePageClick: (tab: number, path: string) => void;
} | null>(null);

// Contains API data that queries the engarchive (i.e., EPICS data)
export const APIContext = React.createContext({
  jcmtwxAPIData: null,
  jcmtsc2APIData: null,
  jcmtnamaAPIData: null,
  jcmtsmuAPIData: null,
  commentsAPIData: null,
  sc2indexAPIData: null,
  acsisindexAPIData: null,
});

function App() {
  const location = useLocation();
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

  // APIContext -- allows data to be fetched once and passed to all components
  // EPICS
  const { data: jcmtwxAPIData, refetch: jcmtwxRefetch } = useFetch(
    "http://localhost:3001/api/live/jcmtwx"
  );
  const { data: jcmtsc2APIData, refetch: jcmtsc2Refetch } = useFetch(
    "http://localhost:3001/api/live/jcmtsc2"
  );
  const { data: jcmtnamaAPIData, refetch: jcmtnamaRefetch } = useFetch(
    "http://localhost:3001/api/live/jcmtnama"
  );

  // ieie
  const { data: jcmtsmuAPIData, refetch: jcmtsmuRefetch } = useFetch(
    "http://localhost:3001/api/live/jcmtsmu"
  );

  // database (MySQL)
  const { data: commentsAPIData, refetch: commentsRefetch } = useFetch(
    "http://localhost:3001/api/live/jcmtcomments"
  );
  const { data: sc2indexAPIData, refetch: sc2indexRefetch } = useFetch(
    "http://localhost:3001/api/live/sc2index"
  );
  const { data: acsisindexAPIData, refetch: acsisindexRefetch } = useFetch(
    "http://localhost:3001/api/live/acsisindex"
  );

  const refetches = [
    jcmtwxRefetch,
    jcmtsc2Refetch,
    jcmtnamaRefetch,
    jcmtsmuRefetch,
    commentsRefetch,
    sc2indexRefetch,
    acsisindexRefetch,
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

  // ensure correct tab is active on page refresh
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveTab(0);
        break;
      case "/jcmtconditions":
      case "/jcmtstatus":
      case "/jcmtcameras":
        setActiveTab(1);
        break;
      case "/observingacsis":
      case "/observingsc2":
      case "/observingall":
        setActiveTab(2);
        break;
      case "/qaacsis":
      case "/qasc2":
        setActiveTab(3);
        break;
      default:
        setActiveTab(0);
    }
  }, [location]);

  return (
    <div>
      <TabContext.Provider value={{ activeTab, handlePageClick }}>
        <Navbar />
        <Tabs />
      </TabContext.Provider>
      <APIContext.Provider
        value={{
          jcmtwxAPIData,
          jcmtsc2APIData,
          jcmtnamaAPIData,
          jcmtsmuAPIData,
          commentsAPIData,
          sc2indexAPIData,
          acsisindexAPIData,
        }}
      >
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/jcmtconditions" element={<JCMTConditions />} />
          <Route path="/jcmtstatus" element={<JCMTStatus />} />
          <Route path="/jcmtcameras" element={<JCMTCameras />} />
          <Route path="/observingacsis" element={<ObservingACSIS />} />
          <Route path="/observingsc2" element={<ObservingSC2 />} />
          <Route path="/observingall" element={<ObservingAll />} />
          <Route path="/qaacsis" element={<QAACSIS />} />
          <Route path="/qascuba2" element={<QASC2 />} />
        </Routes>
      </APIContext.Provider>
    </div>
  );
}

export default App;
