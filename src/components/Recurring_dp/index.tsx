import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import Datepicker from "@/components/Recurring_dp/Datepicker/index";
import { CreateElement, VNode } from "vue";

@Component
export default class RecurringDP extends Vue {
  private render(h: any): VNode {
    return (
      <div class="recurring">
        <Datepicker />
      </div>
    );
  }
}
