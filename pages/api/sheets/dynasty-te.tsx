// pages/api/sheets/dynasty-te.ts
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import type { NextApiRequest, NextApiResponse } from 'next';

const client = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  
  const sheets = google.sheets({ version: 'v4', auth: client });
  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Your spreadsheet ID
    const spreadsheetId = process.env.SPREADSHEET_ID!;

    // Read data from the spreadsheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Dynasty-TE', 
    });

    const values = response.data.values;

    if (!values || values.length === 0) {
      res.status(404).json({ message: 'No data found' });
    } else {
      res.status(200).json(values);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
