import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import JCMTConditions from "./components/pages/JCMTConditions";
import JCMTStatus from "./components/pages/JCMTStatus";
import JCMTCameras from "./components/pages/JCMTCameras";
import JCMTComments from "./components/pages/JCMTComments";
import ACSISObserving from "./components/pages/ACSISObserving";
import ACSISCalibrations from "./components/pages/ACSISCalibrations";
import SCUBA2Observing from "./components/pages/SCUBA2Observing";
import SCUBA2Pipeline from "./components/pages/SCUBA2Pipeline";
import TabJCMT from "./components/TabJCMT";

function App() {
  return (
    <div>
      <Navbar />
      <Tabs />
      <Routes>
        {/* <Route path="/" element={<JCMTConditions />} /> */}
        <Route path="/" element={<TabJCMT />} />
        <Route path="/jcmtconditions" element={<JCMTConditions />} />
        <Route path="/jcmtstatus" element={<JCMTStatus />} />
        <Route path="/jcmtcameras" element={<JCMTCameras />} />
        <Route path="/jcmtcomments" element={<JCMTComments />} />
        <Route path="/acsisobserving" element={<ACSISObserving />} />
        <Route path="/acsiscalibrations" element={<ACSISCalibrations />} />
        <Route path="/scuba2observing" element={<SCUBA2Observing />} />
        <Route path="/scuba2pipeline" element={<SCUBA2Pipeline />} />
      </Routes>
    </div>
  );
}

export default App;
