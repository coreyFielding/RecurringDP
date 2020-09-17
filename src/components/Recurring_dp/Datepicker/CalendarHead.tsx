import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import { IDate, IItem } from "../types/dateTypes";
import {
  StyledHeader,
  StyledBtn,
  StyledArrowLeft,
  StyledArrowRight,
} from "./calendarStyles";

@Component
export default class CalendarHead extends Vue {
  constructor(props: any) {
    super(props);
  }

  @Prop({ required: true }) gotoPrevMonth!: Function;
  @Prop({ required: true }) gotoNextMonth!: Function;
  @Prop({ required: true }) setMonth!: Function;
  @Prop({ required: true }) date!: IDate;
  @Prop({ required: true }) monthName!: string;

  prevBtn() {
    return (
      <StyledBtn type="button" onClick={this.gotoPrevMonth}>
        <StyledArrowLeft src={require("../../../assets/chevron.png")} />
      </StyledBtn>
    );
  }

  calendarHead() {
    return (
      <span>
        <StyledBtn type="button" onClick={this.setMonth}>
          {this.monthName}
        </StyledBtn>
        {this.date.year}
      </span>
    );
  }

  nextBtn() {
    return (
      <StyledBtn type="button" onClick={this.gotoNextMonth}>
        <StyledArrowRight src={require("../../../assets/chevron.png")} />
      </StyledBtn>
    );
  }

  render(h: any) {
    return (
      <StyledHeader>
        {this.prevBtn()} {this.calendarHead()} {this.nextBtn()}
      </StyledHeader>
    );
  }
}
