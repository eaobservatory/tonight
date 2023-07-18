import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const dropdownJCMTRef = useRef<HTMLLIElement>(null);
  const dropdownACSISRef = useRef<HTMLLIElement>(null);
  const dropdownSCUBA2Ref = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();

  const handlePageClick = (tab: number, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    const dropdownRefs = [dropdownJCMTRef, dropdownACSISRef, dropdownSCUBA2Ref];

    dropdownRefs.forEach((dropdownRef) => {
      const dropdownMenu = dropdownRef.current?.children[1];
      if (
        dropdownMenu?.classList.contains("show") &&
        (!dropdownRef.current?.contains(e.target as Node) || // close dropdown menu on click outside
          dropdownMenu?.contains(e.target as Node)) // close dropdown menu on click inside
      ) {
        dropdownMenu.classList.remove("show");
      }
    });
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <ul className="nav nav-tabs nav-justified sticky-top bg-white">
        <li className="nav-item dropdown dropdown-center" ref={dropdownJCMTRef}>
          <a
            className={`nav-link dropdown-toggle ${
              activeTab === 0 ? "active" : ""
            }`}
            data-bs-toggle="dropdown"
            data-bs-auto-close="false"
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
                  handlePageClick(0, "/jcmtconditions");
                }}
              >
                Conditions
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handlePageClick(0, "/jcmtstatus")}
              >
                Instrument Status
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handlePageClick(0, "/jcmtcameras")}
              >
                Cameras
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handlePageClick(0, "/jcmtcomments")}
              >
                Operator Comments
              </a>
            </li>
          </ul>
        </li>
        <li
          className="nav-item dropdown dropdown-center"
          ref={dropdownACSISRef}
        >
          <a
            className={`nav-link dropdown-toggle ${
              activeTab === 1 ? "active" : ""
            }`}
            data-bs-toggle="dropdown"
            data-bs-auto-close="false"
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
                onClick={() => handlePageClick(1, "/acsisobserving")}
              >
                Observing
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handlePageClick(1, "/acsiscalibrations")}
              >
                Calibrations
              </a>
            </li>
          </ul>
        </li>
        <li
          className="nav-item dropdown dropdown-center"
          ref={dropdownSCUBA2Ref}
        >
          <a
            className={`nav-link dropdown-toggle ${
              activeTab === 2 ? "active" : ""
            }`}
            data-bs-toggle="dropdown"
            data-bs-auto-close="false"
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
                onClick={() => handlePageClick(2, "/scuba2observing")}
              >
                Observing
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handlePageClick(2, "/scuba2pipeline")}
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
