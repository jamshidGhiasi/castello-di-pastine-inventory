import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

const sheets = google.sheets('v4');

export interface DataRow {
    [key: string]: string;
}

// TODO@Joel: Replace the route name
export const GET = async(req : NextRequest) => {
    const token = await getToken({ req })
    if (!token) return NextResponse.json({ message: ' Token Not Present. Please Login again'}, { status: 401})

    // Signed in
    console.log("FROM API" , token)

    try {
        const sheet = await sheets.spreadsheets.values.get({
            spreadsheetId: '1zNyWS5goKLzE__HugrFspa4pm3f77WsKpvsvdxr0wsc',
            range: 'INVENTORY',
            access_token: token.access_token as string
        })
        const sheetData: string[][] = sheet.data.values || [];
        if (sheetData.length === 0) {
            return NextResponse.json({ message: 'No data found in the Google Sheet.' })
        }
        const [headerRow, ...dataRows] = sheetData;
        const dataWithHeaders = dataRows.map((row) => {
            const rowData: Record<string, string> = {};
            headerRow.forEach((header, index) => {
                rowData[header] = row[index] || '';
            });
            return rowData;
        });
        return NextResponse.json({ antiques: dataWithHeaders }, { status: 200})
    } catch(error) {
      return NextResponse.json({ message: 'Error Getting Values from Google Sheet' , error}, { status: 400})
    }
}
