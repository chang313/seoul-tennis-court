export type CourtInfo = {
  GUBUN: string;
  SVCID: string;
  MAXCLASSNM: string;
  MINCLASSNM: string;
  SVCSTATNM: "접수중" | "예약마감";
  SVCNM: string;
  PAYATNM: string;
  PLACENM: string;
  USETGTINFO: string;
  SVCURL: string;
  X: string;
  Y: string;
  SVCOPNBGNDT: string;
  SVCOPNENDDT: string;
  RCPTBGNDT: string;
  RCPTENDDT: string;
  AREANM: string;
  IMGURL: string;
  DTLCONT: string;
  TELNO: string;
  V_MIN: string;
  V_MAX: string;
  REVSTDDAYNM: string;
  REVSTDDAY: string;
};

export type Result = {
  CODE: string;
  MESSAGE: string;
};

export type PublicReservationSportResponse = {
  ListPublicReservationSport: {
    list_total_count: number;
    RESULT: Result;
    row: CourtInfo[];
  };
}; 