const Navbar = () => {
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
      <nav className="flex justify-between items-center py-4">
        <a href="#" className="flex items-center">
          <img
            src="@/assets/eao.png"
            width="36"
            height="36"
            id="logo"
            alt="logo"
          />
          <span className="ml-2 font-bold text-xl">JCMT Tonight</span>
        </a>
        <div className="flex">
          <ul className="flex">
            <li className="mr-6">
              <a href="https://www.eao.hawaii.edu" target="_blank">
                EAO
              </a>
            </li>
            <li>
              <a>OMP</a>
              <div>
                <a
                  href="https://omp.eao.hawaii.edu/cgi-bin/nightrep.pl?tel=JCMT"
                  target="_blank"
                >
                  Observing Report
                </a>
                <a
                  href="https://omp.eao.hawaii.edu/cgi-bin/queryfault.pl?cat=JCMT"
                  target="_blank"
                >
                  Faults
                </a>
                <a
                  href="https://omp.eao.hawaii.edu/cgi-bin/queryfault.pl?cat=JCMT_EVENTS"
                  target="_blank"
                >
                  Events
                </a>
                <a
                  href="https://omp.eao.hawaii.edu/cgi-bin/sched.pl?tel=JCMT"
                  target="_blank"
                >
                  Schedule
                </a>
                <a
                  href="https://omp.eao.hawaii.edu/cgi-bin/qstatus.pl"
                  target="_blank"
                >
                  Queue Status
                </a>
              </div>
            </li>
            <li>
              <a>Daycrew</a>
              <div>
                <a
                  href="https://www.eao.hawaii.edu/daycrew/HILO"
                  target="_blank"
                >
                  Hilo
                </a>
                <a
                  href="https://www.eao.hawaii.edu/daycrew/JCMT"
                  target="_blank"
                >
                  JCMT
                </a>
              </div>
            </li>
            <li>
              <a
                href="https://vlbi-control1.eao.hawaii.edu/login.html"
                target="_blank"
              >
                VLBI
              </a>
            </li>
            <li>
              <a
                href="https://www.eao.hawaii.edu/monitoring/tonight/jcmt/archive/?C=N;O=D"
                target="_blank"
              >
                Archive
              </a>
            </li>
          </ul>
          <span>
            {dateUTC} <br /> {dateHST}
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
