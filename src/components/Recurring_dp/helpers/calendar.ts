import moment from "moment";

export const thisYear = parseInt(moment().format("YYYY"));
export const thisMonth = parseInt(moment().format("M"));
export const fDate = "DD-MM-YYYY";

export const parseMonth = (date: moment.Moment) => parseInt(date.format("M"));
export const parseYear = (date: moment.Moment) => parseInt(date.format("YYYY"));

export const getWeekDays = () => {
  return Array.apply(null, Array(7)).map((_, i) =>
    moment(i, "e")
      .format("dd")
      .slice(0, 1)
  );
};

export const getMonthDays = (
  month: number = thisMonth,
  year: number = thisYear
) => moment(`01-${month}-${year}`, fDate);

export const prev = (date: any, amount: number, step: any) =>
  moment(`01-${date.month}-${date.year}`, fDate).subtract(amount, step);

export const next = (date: any, amount: number, step: any) =>
  moment(`01-${date.month}-${date.year}`, fDate).add(amount, step);

export const getPrevMonth = (month: number, year: number) => {
  const date = prev({ month, year }, 1, "M");
  const prevMonth = parseMonth(date);
  const prevMonthYear = parseYear(date);

  return { prevMonth, prevMonthYear };
};

export const getNextMonth = (month: number, year: number) => {
  const date = next({ month, year }, 1, "M");
  const nextMonth = parseMonth(date);
  const nextMonthYear = parseYear(date);
  return { nextMonth, nextMonthYear };
};

export const selectable = (date: moment.Moment) => {
  if (moment(date).isBefore(moment(), "day")) return false;

  return true;
};

export default (month: number = thisMonth, year: number = thisYear) => {
  const days = [];

  let source = moment(`01-${month}-${year}`, fDate);
  source.startOf("week");

  for (let i = 0; i !== 6 * 7; i++) {
    const [year, month, day] = source.format("YYYY-M-D").split("-");
    days.push([year, month, day]);
    source.add(1, "day");
  }

  return days;
};
