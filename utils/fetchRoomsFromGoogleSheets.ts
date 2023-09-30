import fetchAccessTokenFromServer from "@/utils/fetchAccessTokenFromServer";
import fetchGoogleSheetsData from "@/utils/fetchGoogleSheetsData";

/**
 * Fetch rooms from google sheets
 * @link https://docs.google.com/spreadsheets/d/1zNyWS5goKLzE__HugrFspa4pm3f77WsKpvsvdxr0wsc
 */
const fetchRoomsFromGoogleSheets = async () => {
  const accessToken = await fetchAccessTokenFromServer()
  const rooms = await fetchGoogleSheetsData(accessToken)({
    spreadsheetId: '1zNyWS5goKLzE__HugrFspa4pm3f77WsKpvsvdxr0wsc',
    range: 'ROOMS',
  })
  return rooms ? JSON.parse(JSON.stringify(rooms))?.data : []
}

export default fetchRoomsFromGoogleSheets
