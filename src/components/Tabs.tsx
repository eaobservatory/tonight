import { useState } from "react";
import TabJCMT from "./TabJCMT";
import TabACSIS from "./TabACSIS";
import TabSCUBA2 from "./TabSCUBA2";

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <ul className="nav nav-tabs nav-justified sticky-top bg-white">
        <li className="nav-item tab">
          <a
            className={`nav-link ${activeTab === 0 ? "active" : ""}`}
            onClick={() => handleClick(0)}
          >
            JCMT
          </a>
        </li>
        <li className="nav-item tab">
          <a
            className={`nav-link ${activeTab === 1 ? "active" : ""}`}
            onClick={() => handleClick(1)}
          >
            ACSIS
          </a>
        </li>
        <li className="nav-item tab">
          <a
            className={`nav-link ${activeTab === 2 ? "active" : ""}`}
            onClick={() => handleClick(2)}
          >
            SCUBA-2
          </a>
        </li>
      </ul>
      {activeTab === 0 && <TabJCMT />}
      {activeTab === 1 && <TabACSIS />}
      {activeTab === 2 && <TabSCUBA2 />}
    </>
  );
}

export default Tabs;
