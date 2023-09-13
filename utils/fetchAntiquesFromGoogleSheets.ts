import fetchAccessTokenFromServer from "@/utils/fetchAccessTokenFromServer";
import fetchGoogleSheetsData from "@/utils/fetchGoogleSheetsData";

/**
 * Fetch antiques from google sheets
 */
const fetchAntiquesFromGoogleSheets = async () => {
  const accessToken = await fetchAccessTokenFromServer()
  const antiques = await fetchGoogleSheetsData(accessToken)({
    spreadsheetId: '1uFMtKL9_qbB80G3_Poq22ybtpVHbT94gOpHlhhxHlrg',
    range: 'INVENTORY',
  })
  return antiques ? JSON.parse(JSON.stringify(antiques))?.data : []
}

export default fetchAntiquesFromGoogleSheets
