import axios from "axios"

const BASE_URL = 'http://openAPI.seoul.go.kr:8088'
const API_KEY = process.env.NEXT_PUBLIC_OPEN_API_KEY


export const getCourtInfoList = async () => {
  const response = await axios.get(`${BASE_URL}/${API_KEY}/json/ListPublicReservationSport/1/365/테니스장`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return response.data
}