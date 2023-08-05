import { Routes, Route } from "react-router-dom";
import { TabProvider } from "./contexts/TabContext";
import { EPICSProvider } from "./contexts/EPICSContext";
import { IeieProvider } from "./contexts/IeieContext";
import { OMPProvider } from "./contexts/OMPContext";
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

function App() {
  return (
    <div>
      <TabProvider>
        <Navbar />
        <Tabs />
      </TabProvider>
      <EPICSProvider>
        <IeieProvider>
          <OMPProvider>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/jcmtconditions" element={<JCMTConditions />} />
              <Route path="/jcmtstatus" element={<JCMTStatus />} />
              <Route path="/jcmtcameras" element={<JCMTCameras />} />
              <Route path="/observingacsis" element={<ObservingACSIS />} />
              <Route path="/observingsc2" element={<ObservingSC2 />} />
              <Route path="/observingall" element={<ObservingAll />} />
              <Route path="/qaacsis" element={<QAACSIS />} />
              <Route path="/qasc2" element={<QASC2 />} />
            </Routes>
          </OMPProvider>
        </IeieProvider>
      </EPICSProvider>
    </div>
  );
}

export default App;
