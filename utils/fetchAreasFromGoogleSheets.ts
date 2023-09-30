import fetchAccessTokenFromServer from "@/utils/fetchAccessTokenFromServer";
import fetchGoogleSheetsData from "@/utils/fetchGoogleSheetsData";

/**
 * Fetch areas from google sheets
 * @link https://docs.google.com/spreadsheets/d/1zNyWS5goKLzE__HugrFspa4pm3f77WsKpvsvdxr0wsc
 */
const fetchAreaFromGoogleSheets = async () => {
  const accessToken = await fetchAccessTokenFromServer()
  const areas = await fetchGoogleSheetsData(accessToken)({
    spreadsheetId: '1zNyWS5goKLzE__HugrFspa4pm3f77WsKpvsvdxr0wsc',
    range: 'AREAS',
  })
  return areas ? JSON.parse(JSON.stringify(areas))?.data : []
}

export default fetchAreaFromGoogleSheets
