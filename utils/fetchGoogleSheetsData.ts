import {google} from "googleapis";
import {NextResponse} from "next/server";

/**
 * Fetch google sheets data
 * @param accessToken
 * @param getValuesParams
 */
const fetchGoogleSheetsData = (accessToken?: string) => async (getValuesParams: { spreadsheetId: string; range: string }) => {
  if (!accessToken) return
  try {
    const sheets = google.sheets('v4');
    const sheet = await sheets.spreadsheets.values.get({ access_token: accessToken, ...getValuesParams })
    const sheetData: string[][] = sheet.data.values || [];
    if (!sheetData.length) return NextResponse.json({ message: 'No data found in the Google Sheet.' })
    const [headerRow, ...dataRows] = sheetData;
    const dataWithHeaders = dataRows.map((row) => {
      const rowData: Record<string, string> = {};
      headerRow.forEach((header, index) => { rowData[header] = row[index] || '' });
      return rowData;
    });
    console.log('dataWithHeaders', dataWithHeaders)
    return { data: dataWithHeaders }
  } catch (error) {
    return { data: [] }
  }
}

export default fetchGoogleSheetsData
