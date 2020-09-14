<template>
  <Modal :isOpen="!!component">
    <component :is="component" />
  </Modal>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import Modal from "./index.vue";
import IStyles from "@/types/IStyles";
import { ModalBus } from "./ModalBus";

@Component({ components: { Modal } })
export default class ModalRoot extends Vue {
  component: any = null;
  name: string = "";
  title: string = "";
  action: string = "";
  onSave: boolean = false;
  css: IStyles | null = null;

  created() {
    ModalBus.$on("open", (payload: any) => {
      console.log("open");
      const { component, name } = payload;

      this.component = component;
      this.name = name;
    });
  }
}
</script>