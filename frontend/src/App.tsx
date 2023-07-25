import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import JCMTConditions from "./components/pages/JCMTConditions";
import JCMTStatus from "./components/pages/JCMTStatus";
import JCMTCameras from "./components/pages/JCMTCameras";
import JCMTComments from "./components/pages/JCMTComments";
import ACSISObserving from "./components/pages/ACSISObserving";
import ACSISCalibrations from "./components/pages/ACSISCalibrations";
import SCUBA2Observing from "./components/pages/SCUBA2Observing";
import SCUBA2Performance from "./components/pages/SCUBA2Performance";
import Home from "./components/pages/Home";

export const TabContext = React.createContext<{
  activeTab: number;
  handlePageClick: (tab: number, path: string) => void;
} | null>(null);

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const handlePageClick = useCallback(
    (tab: number, path: string) => {
      setActiveTab(tab);
      navigate(path);
    },
    [navigate]
  );

  return (
    <div>
      <TabContext.Provider value={{ activeTab, handlePageClick }}>
        <Navbar />
        <Tabs />
      </TabContext.Provider>
      <div style={{ display: location.pathname === "/" ? "block" : "none" }}>
        <Home />
      </div>
      <div
        style={{
          display: location.pathname === "/jcmtconditions" ? "block" : "none",
        }}
      >
        <JCMTConditions />
      </div>
      <div
        style={{
          display: location.pathname === "/jcmtstatus" ? "block" : "none",
        }}
      >
        <JCMTStatus />
      </div>
      <div
        style={{
          display: location.pathname === "/jcmtcameras" ? "block" : "none",
        }}
      >
        <JCMTCameras />
      </div>
      <div
        style={{
          display: location.pathname === "/jcmtcomments" ? "block" : "none",
        }}
      >
        <JCMTComments />
      </div>
      <div
        style={{
          display: location.pathname === "/acsisobserving" ? "block" : "none",
        }}
      >
        <ACSISObserving />
      </div>
      <div
        style={{
          display:
            location.pathname === "/acsiscalibrations" ? "block" : "none",
        }}
      >
        <ACSISCalibrations />
      </div>
      <div
        style={{
          display: location.pathname === "/sc2observing" ? "block" : "none",
        }}
      >
        <SCUBA2Observing />
      </div>
      <div
        style={{
          display: location.pathname === "/sc2performance" ? "block" : "none",
        }}
      >
        <SCUBA2Performance />
      </div>
    </div>
  );
}

export default App;
