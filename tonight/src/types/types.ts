export interface Comment {
  date: string;
  author: string;
  text: string;
}

export interface SCUBA2Observation {
  backend: string;
  obsnum: number;
  utdate: number;
  obstime: string;
  project: string;
  mode: string;
  inbeam: string;
  object: string;
  map: string;
  tau225: string;
  wvmtau: string;
  seeing: string;
  roof: string;
  door: string;
}

export interface ACSISObservation {
  backend: string;
  obsnum: number;
  utdate: number;
  obstime: string;
  project: string;
  mode: string;
  receiver: string;
  object: string;
  steptime: string;
  tau225: string;
  wvmtau: string;
  seeing: string;
  roof: string;
  door: string;
}
