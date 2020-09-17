import { Component, Provide, Prop, Watch, Vue } from "vue-property-decorator";
import CalendarHead from "./CalendarHead";
import DateCalendar from "./DateCalendar";
import MonthCalendar from "./MonthCalendar";

import calendar, {
  getNextMonth,
  getPrevMonth,
  thisMonth,
  thisYear,
  selectable,
} from "../helpers/calendar";
import validate from "@/utils/validate";
import "../Datepicker/styles.sass";
import { months } from "../helpers/recurrence";
import moment from "moment";
import { IDate, IItem } from "../types/dateTypes";
import {
  StyledContainer,
  StyledDatepicker,
  StyledCalendar,
} from "./calendarStyles";

const uuid = require("uuid/v4");

@Component
export default class CalendarComponent extends Vue {
  date!: IDate;
  dates: IItem[] = [];
  months: any[] = [];
  monthName: string = "";
  selected: IItem[] = [];
  singleConfig: boolean = false;
  rangeConfig: boolean = true;

  created() {
    this.getCalendarDates(this.resolveDate());
  }

  getCalendarDates(date: any) {
    const calendarMonth = date.month || moment().format("M");
    const calendarYear = date.year || moment().format("YYYY");

    this.setMonthName(this.date.month);
    this.getDatesForMonth(calendarMonth, calendarYear);
  }

  getDatesForMonth(month: number, year: number) {
    this.resolveDate(month, year);
    this.setMonthName(this.date.month);
    this.dates = calendar(month, year).map(this.renderDate);
  }

  resolveDate(month: number = thisMonth, year: number = thisYear): IDate {
    return (this.date = {
      current: moment(),
      month: month,
      year: year,
    });
  }

  renderDate(date: any): any {
    return {
      item: new Date(date.join("-")),
      id: `${uuid()}${uuid()}`,
    };
  }

  gotoPrevMonth() {
    const { month, year } = this.date;
    const { prevMonth, prevMonthYear } = getPrevMonth(month, year);

    this.setMonthName(prevMonth);
    this.getCalendarDates({ month: prevMonth, year: prevMonthYear });
  }

  gotoNextMonth() {
    const { month, year } = this.date;
    const { nextMonth, nextMonthYear } = getNextMonth(month, year);

    this.setMonthName(nextMonth);
    this.getCalendarDates({ month: nextMonth, year: nextMonthYear });
  }

  setMonth() {
    if (!!this.months?.length) return;
    Object.keys(months).forEach((m) =>
      this.months.push({ full: m, short: m.substr(0, 3) })
    );
  }

  handleMonthChange(month: string) {
    this.getDatesForMonth(months[month], this.date.year);
    this.months = [];
  }

  setMonthName(month: number = parseInt(moment().format("M"))) {
    this.monthName = moment()
      .month(month - 1)
      .format("MMMM");
  }

  checkDate = () => {
    throw new Error("Date must be provided");
  };

  rescheduleEnd(date: IItem) {
    if (selectable(date.item) && this.selected[1]) {
      this.removeDate(date, date.id);
      this.appendDate(this.selected, date);
    }
  }

  handleDateRange(date: IItem) {
    const availableDate = selectable(date.item);
    const noSetEnd = this.rangeConfig && this.selected.length <= 1;

    if (validate(availableDate, noSetEnd)) this.appendDate(this.selected, date);

    this.rescheduleEnd(date);
  }

  handleSingleDate(date: IItem = this.checkDate()) {
    const { month, year } = this.date;

    if (selectable(date.item)) this.appendDate(this.selected, date);
  }

  appendDate(dates: IItem[], incoming: IItem) {
    const toDelete = dates.find((d) => d.id === incoming.id);
    if (toDelete) return this.removeDate(toDelete, incoming.id);

    this.selected.push(incoming);
  }

  removeDate(toDelete: IItem, id: string) {
    document.getElementById(id)!.classList.remove("activeClass");
    this.selected.splice(this.selected.indexOf(toDelete), 1);
  }

  handleDateReset() {
    const capacity = this.selected.length;
    if (!capacity) return null;

    for (let i = capacity - 1; i >= 0; i--) {
      this.selected.splice(this.selected.indexOf(this.selected[i], 1));
    }

    this.resolveDate();
    this.setMonthName();
  }

  handleRangeConfig() {
    this.handleDateReset();

    this.singleConfig = this.rangeConfig;
    this.rangeConfig = !this.rangeConfig;
  }

  handleSingleConfig() {
    this.handleDateReset();

    this.rangeConfig = this.singleConfig;
    this.singleConfig = !this.singleConfig;
  }

  render() {
    return (
      <StyledDatepicker>
        <StyledContainer>
          <StyledCalendar>
            <CalendarHead
              gotoPrevMonth={this.gotoPrevMonth}
              gotoNextMonth={this.gotoNextMonth}
              setMonth={this.setMonth}
              monthName={this.monthName}
              date={this.date}
            />

            {!!this.months.length ? (
              <MonthCalendar
                handleMonthChange={this.handleMonthChange}
                months={this.months}
              />
            ) : (
              <DateCalendar
                dates={this.dates}
                date={this.date}
                selected={this.selected}
                handleSelect={
                  this.singleConfig
                    ? this.handleSingleDate
                    : this.handleDateRange
                }
                handleRangeConfig={this.handleRangeConfig}
                rangeSet={this.rangeConfig}
                handleSingleConfig={this.handleSingleConfig}
                handleDateReset={this.handleDateReset}
              />
            )}
          </StyledCalendar>
        </StyledContainer>
      </StyledDatepicker>
    );
  }
}
