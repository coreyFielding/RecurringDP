import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CalendarOptions extends Vue {
  constructor(props: any) {
    super(props);
  }

  @Prop({ required: true }) handleDateReset!: Function;
  @Prop({ required: true }) handleRangeConfig!: Function;
  @Prop({ required: true }) handleSingleConfig!: Function;

  reset() {
    return (
      <button type="button" onClick={this.handleDateReset}>
        Reset
      </button>
    );
  }

  setRange() {
    return (
      <button type="button" onClick={this.handleRangeConfig}>
        Select range
      </button>
    );
  }

  setIndividual() {
    return (
      <button type="button" onClick={this.handleSingleConfig}>
        Select individual
      </button>
    );
  }

  render(h: any) {
    return (
      <div>
        {this.reset()}
        {this.setRange()}
        {this.setIndividual()}
      </div>
    );
  }
}
