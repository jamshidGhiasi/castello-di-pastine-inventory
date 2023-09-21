import fetchAccessTokenFromServer from "@/utils/fetchAccessTokenFromServer";
import fetchGoogleSheetsData from "@/utils/fetchGoogleSheetsData";

/**
 * Fetch antiques from google sheets
 */
const fetchAntiquesFromGoogleSheets = async () => {
  const accessToken = await fetchAccessTokenFromServer()
  const antiques = await fetchGoogleSheetsData(accessToken)({
    spreadsheetId: '1zNyWS5goKLzE__HugrFspa4pm3f77WsKpvsvdxr0wsc',
    range: 'INVENTORY',
  })
  return antiques ? JSON.parse(JSON.stringify(antiques))?.data : []
}

export default fetchAntiquesFromGoogleSheets
