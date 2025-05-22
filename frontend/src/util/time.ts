/** Converts a local date to UTC midnight ISO string */
export function toUTCDateString(date: Date): string {
  const localMidnight = new Date(date);
  localMidnight.setHours(0, 0, 0, 0);
  return localMidnight.toISOString();
}

/** Converts "3:45 PM" to "15:45" */
export function convertTo24Hour(time12h: string): string {
  const match = time12h.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) throw new Error(`Invalid time format: "${time12h}"`);
  let [_, hours, minutes, period] = match;
  let hour = parseInt(hours, 10);
  if (period.toUpperCase() === 'PM' && hour < 12) hour += 12;
  if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;
  return `${hour.toString().padStart(2, '0')}:${minutes}`;
}

/** Returns a Date object using base date + HH:mm */
export function parseTime(timeStr: string, baseDate: Date): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), hours, minutes);
}

/** Combines date + time to a UTC ISO string */
export function toUTCISOString(date: Date, time: string): string {
  return parseTime(time, date).toISOString();
}

/** Formats Date into "3:45 PM" */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/** Gets local time zone abbreviation (e.g., PDT, EST) */
export function getTimeZoneAbbr(): string {
  return (
    new Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
      .formatToParts(new Date())
      .find((part) => part.type === 'timeZoneName')?.value || ''
  );
}
