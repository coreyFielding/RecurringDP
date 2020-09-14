import { Component, Vue } from "vue-property-decorator";
import RecurringDP from "@/components/Recurring_dp/index";
import { CreateElement, VNode } from "vue";

@Component
export default class Root extends Vue {
  private render(h: any): VNode {
    return (
      <div class="root">
        <RecurringDP />
      </div>
    );
  }
}
