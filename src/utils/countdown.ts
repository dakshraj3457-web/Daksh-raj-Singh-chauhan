export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isReached: boolean;
  totalSeconds: number;
}

/**
 * Calculates remaining time until target date string.
 * @param targetDateISO ISO timestamp string (e.g. "2026-11-06T00:00:00+05:30")
 * @param nowMs Current time in milliseconds (defaults to Date.now())
 */
export function calculateTimeRemaining(
  targetDateISO: string,
  nowMs: number = Date.now()
): CountdownTime {
  const targetMs = new Date(targetDateISO).getTime();

  if (Number.isNaN(targetMs)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isReached: true,
      totalSeconds: 0,
    };
  }

  const diffMs = targetMs - nowMs;

  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isReached: true,
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const days = Math.floor(totalSeconds / 86400);

  return {
    days,
    hours,
    minutes,
    seconds,
    isReached: false,
    totalSeconds,
  };
}

/**
 * Formats a single number with leading zero
 */
export function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
