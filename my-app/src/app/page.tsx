'use client'
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";


export default function Home() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <>
    <Calendar mode="single" selected={date} onSelect={setDate} />
    </>

  );
}
