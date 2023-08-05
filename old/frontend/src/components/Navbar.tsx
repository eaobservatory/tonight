import { useTabs } from "../contexts/TabContext";

function Navbar() {
  const { handlePageClick } = useTabs();
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
                href="https://www.eao.hawaii.edu"
                target="_blank"
              >
                EAO
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                id="navbarDropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                OMP
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  className="dropdown-item"
                  href="https://omp.eao.hawaii.edu/cgi-bin/nightrep.pl?tel=JCMT"
                  target="_blank"
                >
                  Observing Report
                </a>
                <a
                  className="dropdown-item"
                  href="https://omp.eao.hawaii.edu/cgi-bin/queryfault.pl?cat=JCMT"
                  target="_blank"
                >
                  Faults
                </a>
                <a
                  className="dropdown-item"
                  href="https://omp.eao.hawaii.edu/cgi-bin/queryfault.pl?cat=JCMT_EVENTS"
                  target="_blank"
                >
                  Events
                </a>
                <a
                  className="dropdown-item"
                  href="https://omp.eao.hawaii.edu/cgi-bin/sched.pl?tel=JCMT"
                  target="_blank"
                >
                  Schedule
                </a>
                <a
                  className="dropdown-item"
                  href="https://omp.eao.hawaii.edu/cgi-bin/qstatus.pl"
                  target="_blank"
                >
                  Queue Status
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                id="navbarDropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Daycrew
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  className="dropdown-item"
                  href="https://www.eao.hawaii.edu/daycrew/HILO"
                  target="_blank"
                >
                  Hilo
                </a>
                <a
                  className="dropdown-item"
                  href="https://www.eao.hawaii.edu/daycrew/JCMT"
                  target="_blank"
                >
                  JCMT
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://vlbi-control1.eao.hawaii.edu/login.html"
                target="_blank"
              >
                VLBI
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
