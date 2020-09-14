import { Component, Vue } from "vue-property-decorator";
import { CreateElement, VNode } from "vue";

@Component
export default class TimeSelect extends Vue {
  render(h: CreateElement): VNode {
    return <div class="time-select"></div>;
  }
}
