import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import path from 'path';

// Load service account key JSON
const SERVICE_ACCOUNT_KEY_PATH = path.join(__dirname, '../googlejsonkey.json');

// Create GoogleAuth instance with required scope
const auth = new GoogleAuth({
  keyFile: SERVICE_ACCOUNT_KEY_PATH,
  scopes: ['https://www.googleapis.com/auth/calendar.events'],
});

// Create the calendar client using the service account
export const calendar = google.calendar({ version: 'v3', auth });

export async function createGoogleCalendarEvent(eventData: {
  startTime: string; // ISO 8601
  endTime: string; // ISO 8601
  summary?: string;
  description?: string;
}) {
  const event = {
    summary: eventData.summary || 'New Booking',
    description: eventData.description || 'Client booked through Stripe',
    start: { dateTime: eventData.startTime },
    end: { dateTime: eventData.endTime },
  };

  try {
    const res = await calendar.events.insert({
      calendarId: 'rcomeruw@gmail.com', // this must be a calendar that shared access with the service account
      requestBody: event,
    });

    console.log('Google Calendar event created:', res.data.htmlLink);
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
  }
}