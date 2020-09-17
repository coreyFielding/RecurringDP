import { Component, Provide, Prop, Watch, Vue } from "vue-property-decorator";
import { StyledMonthGrid, StyledMonthCell } from "./calendarStyles";
import moment from "moment";

@Component
export default class MonthCalendar extends Vue {
  constructor(props: any) {
    super(props);
  }

  @Prop() months!: { full: string; short: string }[];
  @Prop({ required: true }) handleMonthChange!: Function;

  render() {
    const isPassedMonth = (month: string): boolean => {
      const baseMonth = moment().month(month);
      const isPassed = baseMonth.isBefore(moment(), "month");
      return isPassed;
    };
    return (
      <StyledMonthGrid>
        {this.months.map((month) => (
          <StyledMonthCell
            type="button"
            onClick={() => this.handleMonthChange(month.full)}
            class={{ passedMonthCell: isPassedMonth }}
          >
            {month.short}
          </StyledMonthCell>
        ))}
      </StyledMonthGrid>
    );
  }
}
