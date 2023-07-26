import { useEffect, useRef, useContext } from "react";
import { TabContext } from "../App";

function Tabs() {
  const { activeTab, handlePageClick } = useContext(TabContext) ?? {};
  const dropdownJCMTRef = useRef<HTMLLIElement>(null); // refs used to close dropdown menus on click outside
  const dropdownObservingRef = useRef<HTMLLIElement>(null);
  const dropdownQARef = useRef<HTMLLIElement>(null);

  const handleDocumentClick = (e: MouseEvent) => {
    const dropdownRefs = [dropdownJCMTRef, dropdownObservingRef, dropdownQARef];

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
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 0 ? "active" : ""}`}
            data-bs-toggle="dropdown"
            data-bs-auto-close="false"
            href="#"
            onClick={() => {
              handlePageClick?.(0, "/");
            }}
            role="button"
            aria-expanded="false"
          >
            Overview
          </a>
        </li>
        <li className="nav-item dropdown dropdown-center" ref={dropdownJCMTRef}>
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
            JCMT
          </a>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => {
                  handlePageClick?.(1, "/jcmtconditions");
                }}
              >
                Conditions
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handlePageClick?.(1, "/jcmtstatus")}
              >
                Instrument Status
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handlePageClick?.(1, "/jcmtcameras")}
              >
                Cameras
              </a>
            </li>
          </ul>
        </li>
        <li
          className="nav-item dropdown dropdown-center"
          ref={dropdownObservingRef}
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
            Observing
          </a>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handlePageClick?.(2, "/observingacsis")}
              >
                ACSIS
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handlePageClick?.(2, "/observingscuba2")}
              >
                SCUBA-2
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handlePageClick?.(1, "/observingall")}
              >
                All
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item dropdown dropdown-center" ref={dropdownQARef}>
          <a
            className={`nav-link dropdown-toggle ${
              activeTab === 3 ? "active" : ""
            }`}
            data-bs-toggle="dropdown"
            data-bs-auto-close="false"
            href="#"
            role="button"
            aria-expanded="false"
          >
            QA
          </a>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handlePageClick?.(3, "/qaacsis")}
              >
                ACSIS
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handlePageClick?.(3, "/qascuba2")}
              >
                SCUBA-2
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}

export default Tabs;
