import { Component, Provide, Prop, Watch, Vue } from "vue-property-decorator";
import TimeSelect from "./TimeSelect";
import styled from "vue-styled-components";

import calendar, {
  getNextMonth,
  getPrevMonth,
  getWeekDays,
  thisMonth,
  thisYear,
  getMonthDays,
} from "../helpers/calendar";
import "../Datepicker/styles.css";

import { months } from "../helpers/recurrence";
import moment from "moment";
import { IDate, IItem } from "../types/dateTypes";
const uuid = require("uuid/v4");

const styledHeader = styled.div`
    display: flex
    align-items: center
    justify-content: space-between
    height: 40px
    width: calc(100% - 10px)
    margin-top: 3px
`;

const styledBtn = styled.button`
  background: none
  cursor: pointer
  border: none
`;

const styledHeaderBtn = styledBtn.extend``;

const styledArrow = styledBtn.extend`
  height: 15px
  transform: rotate(90deg)
  transition: all 150ms
`;

const styledDatepicker = styled.div`
  height: 250px
  min-width: 200px
  max-width: 250px
  background: darken(#FFF, 3%)
  border-radius: 3px
  overflow: hidden
  box-shadow: 0px 2px 10px rgba(darken(#333867, 25%), .3)
  z-index: 1000
  font-family: Arial
`;

const styledGrid = styled.div`
  display: grid;
`;

const styledCalendarGrid = styledGrid.extend`
  grid-template: repeat(7, auto) / repeat(7, auto)
`;

const styledMonthGrid = styledGrid.extend`
  grid-template: repeat(7, auto) / repeat(4, auto)

`;

const styledCell = styled.div`
  text-align: center
  align-self: center
  user-select: none
  min-width: 20px
  max-width: 20px
  padding: 0.6em 0.3em
  margin: 0.05rem
  font-size: 10px
  cursor: pointer
`;

const styledLabelCell = styledCell.extend`
  color: grey
`;

const styledDateCell = styledCell.extend`
  color: #000
  font-size: 10px
  text-align: center
  border-radius: 50%
  outline: none
  transition: all .150s ease-out
  animation: fade 1s ease-in both
  
  &:hover {
    color: #FFF
    background: green
    cursor: pointer
  }
    
`;

const styledMonthCell = styledCell.extend`
  border-radius: 3px
  font-size: 14px
  min-width: 100%
  margin: 3px
`;

const todayCell = {
  background: "blue",
};

@Component
export default class Calendar extends Vue {
  labels: string[] = getWeekDays();
  date!: IDate;
  dates: IItem[] = [];
  months: any[] = [];
  years: string[] = [];
  monthName!: string;

  created() {
    this.getCalendarDates(this.resolveDate());
  }

  resolveDate(month: number = thisMonth, year: number = thisYear): IDate {
    return (this.date = {
      current: moment(),
      month: month,
      year: year,
    });
  }

  getCalendarDates(date: any) {
    const calendarMonth = date.month || moment().format("M");
    const calendarYear = date.year || moment().format("YYYY");
    this.monthName = moment()
      .month(calendarMonth - 1)
      .format("MMMM");

    this.getDatesForMonth(calendarMonth, calendarYear);
  }

  getDatesForMonth(month: number, year: number) {
    this.monthName = moment()
      .month(month - 1)
      .format("MMMM");
    this.resolveDate(month, year);
    this.dates = calendar(month, year).map(this.renderDate);
    console.log(this.dates);
  }

  gotoPrevMonth() {
    const { month, year } = this.date;
    const { prevMonth, prevMonthYear } = getPrevMonth(month, year);

    this.getCalendarDates(this.resolveDate(prevMonth, prevMonthYear));
  }

  gotoNextMonth() {
    const { month, year } = this.date;
    const { nextMonth, nextMonthYear } = getNextMonth(month, year);

    this.getCalendarDates(this.resolveDate(nextMonth, nextMonthYear));
  }

  // Change active month
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

  // Change active year
  setYear() {}

  renderDate(date: any): any {
    return {
      item: new Date(date.join("-")),
      id: `${this.monthName}${uuid()}`,
    };
  }

  isToday(date: any): boolean {
    return moment(this.date.current).isSame(date.item, "day");
  }

  isPassedDay(date: any): boolean {
    return moment(date.item).isBefore(this.date.current) && !this.isToday(date);
  }

  private render(h: any): any {
    const prevBtn = (
      <button type="button" onClick={this.gotoPrevMonth} class="arrowLeft">
        <styledArrow as="img" src="../../../assets/chevron.png" />
      </button>
    );

    const calendarHead = (
      <div class="date-picker__header date">
        <span>
          <styledBtn type="button" onClick={this.setMonth}>
            {this.monthName}
          </styledBtn>
          <styledBtn type="button" onClick={this.setYear}>
            {this.date.year}
          </styledBtn>
        </span>
      </div>
    );
    const nextBtn = (
      <button type="button" onClick={this.gotoNextMonth} class="arrowRight">
        <styledArrow as="img" src="../../../assets/chevron.png" />
      </button>
    );

    const labels = this.labels.map((item) => (
      <styledLabelCell>{item.toUpperCase()}</styledLabelCell>
    ));

    const dateEl = this.dates.map((date) => (
      <styledDateCell
        type="button"
        id={date.id}
        class={{
          todayCell: this.isToday(date),
          passedDayCell: this.isPassedDay(date),
        }}
      >
        {date.item.getDate()}
      </styledDateCell>
    ));

    const monthEl = this.months.map((month) => (
      <styledMonthCell
        type="button"
        onClick={this.handleMonthChange(month.full)}
      >
        {month.short}
      </styledMonthCell>
    ));

    return (
      <styledDatepicker>
        <styledHeader class="datepicker__header">
          {prevBtn} {calendarHead} {nextBtn}
        </styledHeader>
        <styledCalendarGrid>
          {labels}
          {dateEl}
        </styledCalendarGrid>
        <styledMonthGrid>{monthEl}</styledMonthGrid>
      </styledDatepicker>
    );
  }
}
