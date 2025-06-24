'use client'
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import CourtInfoTable from "@/components/CourtInfoTable";
import axios from "axios";
import { useState } from "react";
import { CourtInfo, PublicReservationSportResponse } from "@/types";


const BASE_URL = 'http://openAPI.seoul.go.kr:8088'
const API_KEY = process.env.NEXT_PUBLIC_OPEN_API_KEY

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [courtInfoList, setCourtInfoList] = useState<CourtInfo[]>([]);


  const handleGetData = async () => {
    const response = await axios.get<PublicReservationSportResponse>(`${BASE_URL}/${API_KEY}/json/ListPublicReservationSport/1/5/테니스장`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(response.data)

  }
  return (
    <>
    <Calendar mode="single" selected={date} onSelect={setDate}  className="rounded-md border shadow-sm" />
    <Button onClick={handleGetData}>Get Data</Button>
    <CourtInfoTable courtInfoList={courtInfoList}/>
    </>

  );
}
