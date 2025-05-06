export function useTimeZoneAbbr(): string {
  return (
    new Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
      .formatToParts(new Date())
      .find((part) => part.type === 'timeZoneName')?.value || ''
  );
}
