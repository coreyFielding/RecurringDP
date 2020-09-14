import { Component, Vue } from "vue-property-decorator";
import { VNode } from "vue";

@Component
export default class App extends Vue {
  render(h: any): VNode {
    return (
      <div id="app">
        <router-view />
      </div>
    );
  }
}
