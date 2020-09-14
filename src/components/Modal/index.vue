<template>
  <div v-if="isOpen" class="modal-backdrop" :style="modalCSS">
    modal
    <div class="dialog" :class="{open: isOpen}" @click.stop>
      <span class="dialog__header title">{{title}}</span>
      <img
        src="../../assets/close-icon.png"
        @click="$emit('onCancel')"
        class="dialog__header close"
      />

      <div class="dialog__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  @Prop({ required: true }) isOpen: boolean = false;
}
</script>

<style lang="sass" scoped>
.modal-backdrop
  position: fixed
  width: 100%
  height: 100%
  display: flex
  flex-flow: column
  justify-content: center
  background: rgba($c-black, .8)

.dialog
</style>