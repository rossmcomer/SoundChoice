import { google } from 'googleapis';
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_REFRESH_TOKEN,
} = require('../util/config');

export const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
);

oauth2Client.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN,
});

export const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export async function createGoogleCalendarEvent(eventData: {
  startTime: string; // ISO
  endTime: string; // ISO
  summary?: string;
  description?: string;
}) {
  const event = {
    summary: eventData.summary || 'New Booking',
    description: eventData.description || 'Client booked through Stripe',
    start: {
      dateTime: eventData.startTime,
    },
    end: {
      dateTime: eventData.endTime,
    },
  };

  try {
    const res = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });
    console.log('Google Calendar event created:', res.data.htmlLink);
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
  }
}
