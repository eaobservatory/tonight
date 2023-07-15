import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleClick = (tab: number, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <>
      <ul className="nav nav-tabs nav-justified sticky-top bg-white">
        <li className="nav-item dropdown">
          <a
            className={`nav-link dropdown-toggle ${
              activeTab === 0 ? "active" : ""
            }`}
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false"
          >
            JCMT
          </a>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                onClick={() => {
                  handleClick(0, "/jcmtconditions");
                }}
              >
                Conditions
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handleClick(0, "/jcmtstatus")}
              >
                Instrument Status
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handleClick(0, "/jcmtcameras")}
              >
                Cameras
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handleClick(0, "/jcmtcomments")}
              >
                Operator Comments
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a
            className={`nav-link dropdown-toggle ${
              activeTab === 1 ? "active" : ""
            }`}
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false"
          >
            ACSIS
          </a>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                onClick={() => handleClick(1, "/acsisobserving")}
              >
                Observing
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handleClick(1, "/acsiscalibrations")}
              >
                Calibrations
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a
            className={`nav-link dropdown-toggle ${
              activeTab === 2 ? "active" : ""
            }`}
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false"
          >
            SCUBA
          </a>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                onClick={() => handleClick(2, "/scuba2observing")}
              >
                Observing
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handleClick(2, "/scuba2pipeline")}
              >
                Data Reduction Pipeline
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}

export default Tabs;
