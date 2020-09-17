import { Component, Provide, Prop, Watch, Vue } from "vue-property-decorator";
import CalendarOptions from "./CalendarOptions";

import moment from "moment";
import calendar, { getWeekDays } from "../helpers/calendar";
import validate from "@/utils/validate";
import { IItem, IDate } from "../types/dateTypes";

import {
  StyledDateGrid,
  StyledLabelCell,
  StyledDateCell,
} from "./calendarStyles";

@Component
export default class DateCalendar extends Vue {
  constructor(props: any) {
    super(props);
  }

  @Prop({ required: true }) dates!: IItem[];
  @Prop({ required: true }) date!: IDate;
  @Prop() selected!: IItem[];
  @Prop({ required: true }) handleSelect!: Function;
  @Prop() handleRangeConfig!: Function;
  @Prop() handleSingleConfig!: Function;
  @Prop() rangeSet!: boolean;
  @Prop() handleDateReset!: Function;

  sameDate(existing: moment.Moment, selected: moment.Moment) {
    return existing?.valueOf() === selected?.valueOf();
  }
  isToday(date: any): boolean {
    return moment(this.date.current).isSame(date.item, "day");
  }

  isPassedDay(date: any): boolean {
    const beforeToday = moment(date.item).isBefore(this.date.current);
    const notToday = !this.isToday(date);
    const sameMonth = this.date.current.isSame(date.item, "month");

    return validate(beforeToday, notToday, sameMonth);
  }

  isActiveDay(date: any): boolean {
    return !!this.selected.find((sDate: IItem) =>
      this.sameDate(sDate.item, date.item)
    );
  }

  isStartDate(date: IItem): boolean {
    return this.sameDate(this.selected[0]?.item, date.item);
  }

  isEndDate(date: IItem): boolean {
    return validate(
      this.sameDate(this.selected[1]?.item, date.item) &&
        moment(date.item).isAfter(this.selected[0].item)
    );
  }

  isPrevMonth(date: IItem): boolean {
    return moment(date.item).isBefore(this.date.current, "month");
  }

  isNextMonth(date: IItem): boolean {
    return moment(date.item).isAfter(this.date.current, "month");
  }

  isInDuration(date: IItem): boolean {
    const baseDate = moment(date.item);

    return validate(
      this.rangeSet,
      baseDate.isAfter(this.selected[0]?.item),
      baseDate.isBefore(this.selected[1]?.item)
    );
  }

  dayLabel() {
    const labels: string[] = getWeekDays();

    return labels.map((item: string) => (
      <StyledLabelCell>{item.toUpperCase()}</StyledLabelCell>
    ));
  }

  renderDates() {
    if (!this.dates) return null;

    return this.dates.map((date) => (
      <StyledDateCell
        type="button"
        id={date.id}
        class={{
          todayCell: this.isToday(date),
          passedDayCell: this.isPassedDay(date),
          activeDayCell: this.isActiveDay(date),
          startCell: this.isStartDate(date),
          endCell: this.isEndDate(date),
          durationCell: this.isInDuration(date),
          prevMonthCell: this.isPrevMonth(date),
          nextMonthCell: this.isNextMonth(date),
        }}
        onClick={() => this.handleSelect(date)}
      >
        {date.item.getDate()}
      </StyledDateCell>
    ));
  }

  render() {
    return (
      <div>
        <StyledDateGrid>
          {this.dayLabel()}
          {this.renderDates()}
        </StyledDateGrid>
        <CalendarOptions
          handleRangeConfig={this.handleRangeConfig}
          handleSingleConfig={this.handleSingleConfig}
          handleDateReset={this.handleDateReset}
        />
      </div>
    );
  }
}
