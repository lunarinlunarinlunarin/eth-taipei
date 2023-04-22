import dayjs from "dayjs";

export const MINUTE_SECONDS = 60;
export const HOUR_SECONDS = MINUTE_SECONDS * 60;
export const DAY_SECONDS = HOUR_SECONDS * 24;
export const WEEK_SECONDS = DAY_SECONDS * 7;
export const MONTH_SECONDS = HOUR_SECONDS * 730; // 30.41 days
export const YEAR_SECONDS = DAY_SECONDS * 365; // 365 days

export const IntervalUnits = {
  MONTH: "MONTH",
  YEAR: "YEAR",
  DAY: "DAY",
  WEEK: "WEEK",
  HOUR: "HOUR",
} as const;

export type IntervalUnits = (typeof IntervalUnits)[keyof typeof IntervalUnits];

export function getNextPeriod(period_end: Date, interval: IntervalUnits, count: number): { next_swap_at: Date; last_swap_at: Date } {
  const lowerCaseInterval = interval.toLocaleLowerCase();
  return {
    last_swap_at: dayjs(period_end).toDate(),
    next_swap_at: dayjs(period_end)
      .add(count, lowerCaseInterval as dayjs.ManipulateType)
      .toDate(),
  };
}
