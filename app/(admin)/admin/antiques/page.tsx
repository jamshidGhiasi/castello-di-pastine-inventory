import AdminLayout from "@/components/admin/layout"
import AdminAntiquesDataTable from "@/components/admin/antiques/admin-antiques-data-table"
import { getServerSession } from 'next-auth'
import authOptions from "@/lib/auth-options";
import {NextResponse} from "next/server";
import { google } from "googleapis"

export const metadata = {
  title: 'Admin Antiques Page',
  description: 'An overview of antiques.',
}

/**
 * Fetch next auth access token from RSCs
 */
const fetchAccessTokenFromServer = async () => {
  const session = await getServerSession(authOptions)
  const accessToken = session?.user?.access_token
  return accessToken
}

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
    return { data: dataWithHeaders }
  } catch (error) {
    return { data: [] }
  }
}

/**
 * Fetch antiques from google sheets
 */
const fetchAntiquesFromGoogleSheets = async () => {
  const accessToken = await fetchAccessTokenFromServer()
  const antiques = await fetchGoogleSheetsData(accessToken)({
    spreadsheetId: '1zNyWS5goKLzE__HugrFspa4pm3f77WsKpvsvdxr0wsc',
    range: 'INVENTORY',
  })
  return JSON.parse(JSON.stringify(antiques))?.data
}

const AdminAntiquesListPage = async () => {
  const antiques = await fetchAntiquesFromGoogleSheets()

  return (
    <AdminLayout>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Antiques
        </h1>

        <AdminAntiquesDataTable data={antiques} />
      </div>
    </AdminLayout>
  )
}

export default AdminAntiquesListPage
