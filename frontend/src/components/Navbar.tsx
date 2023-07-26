import { useContext } from "react";
import { TabContext } from "../App";

function Navbar() {
  const { handlePageClick } = useContext(TabContext) ?? {};
  const date = new Date();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dateUTC = `${date.getUTCFullYear()}/${(date.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getUTCDate().toString().padStart(2, "0")} ${
    weekdays[date.getUTCDay()]
  } ${date.getUTCHours().toString().padStart(2, "0")}:${date
    .getUTCMinutes()
    .toString()
    .padStart(2, "0")} UTC`;
  const dateHST = `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")} ${date.toLocaleString("en-US", {
    weekday: "short",
  })} ${date.toLocaleString("en-US", {
    timeZone: "Pacific/Honolulu",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  })} HST`;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          className="navbar-brand mr-0 mr-md-2"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageClick?.(0, "/");
          }}
        >
          <img
            src="./src/assets/eao.png"
            width="36"
            height="36"
            className="d-inline-block align-top"
            id="logo"
            alt="logo"
          />
          <span>JCMT Tonight</span>
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.eao.hawaii.edu/JCMT/"
                target="_blank"
              >
                JCMT
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="http://omp.eao.hawaii.edu/cgi-bin/nightrep.pl?tel=JCMT"
                target="_blank"
              >
                Observing Report
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.eao.hawaii.edu/monitoring/tonight/jcmt/archive/?C=N;O=D"
                target="_blank"
              >
                Archive
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="http://omp.eao.hawaii.edu/cgi-bin/qstatus.pl"
                target="_blank"
              >
                Queue Status
              </a>
            </li>
          </ul>
          <span className="navbar-text ms-auto">
            {dateUTC} <br /> {dateHST}
          </span>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
