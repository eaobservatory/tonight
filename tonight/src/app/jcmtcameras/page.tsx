import { Suspense } from "react";

export default function JCMTCameras() {
  return (
    <>
      <a href="http://irtfweb.ifa.hawaii.edu/~irtfcameras/" target="_blank">
        IRTF
      </a>
      <br />
      <img
        src="http://irtfweb.ifa.hawaii.edu/~irtfcameras/c166/latest.jpg"
        alt="IRTF"
        className="inline w-1/3"
      />
      <img
        src="http://irtfweb.ifa.hawaii.edu/~irtfcameras/c166/last2h.gif"
        alt="IRTF gif"
        className="inline w-1/3"
      />
      <br />
      <p>JCMT/UKIRT</p>
      <img
        src="https://www.eao.hawaii.edu/weather/images/jcmt.jpg"
        alt="JCMT"
        className="inline w-1/3"
      />
      <img
        src="https://www.eao.hawaii.edu/weather/images/jcmtanim.gif"
        alt="JCMT gif"
        className="inline w-1/3"
      />
      <img
        src="https://ukirt.ifa.hawaii.edu/webcam"
        alt="UKIRT"
        className="inline w-1/3"
      />
      <a
        href="https://gemini.edu/sciops/telescopes-and-sites/weather/mauna-kea/cloud-cam/"
        target="_blank"
      >
        Gemini Cloud Cam
      </a>
      <br />
      <span>SMA?</span>
    </>
  );
}
