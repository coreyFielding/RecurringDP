import { Component, Provide, Prop, Watch, Vue } from "vue-property-decorator";
import Calendar from "./Calendar";
import TimeSelect from "./TimeSelect";
import { CreateElement, VNode } from "vue";

@Component
export default class Datepicker extends Vue {
  private render(h: any): VNode {
    return (
      <div class="recurring">
        <TimeSelect />
        <Calendar />
      </div>
    );
  }
}
