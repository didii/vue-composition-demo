<template>
  <div class="modal-container">
    <div class="overlay"></div>
    <div class="modal" tabindex="-1" role="dialog" style="display:initial;">
      <div class="modal-dialog" role="document">
        <form class="modal-content" @submit="onCreateClicked($event)">
          <div class="modal-header">
            <h5 class="modal-title">New file</h5>
            <button type="button" @click="onCancelClicked()" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Please enter a new filename</p>
            <input type="text" v-model="filename" class="form-control" />
          </div>
          <div class="modal-footer">
            <button type="sumbit" @click="onCreateClicked()" class="btn btn-primary">Create</button>
            <button type="button" @click="onCancelClicked()" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
    private filename: string = '';

    public onCreateClicked(event?: Event) {
        if (event) {
            event.preventDefault();
        }
        this.$emit('onAccept', this.filename);
        return false;
    }
    public onCancelClicked() {
        this.$emit('onCancel');
    }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}
</style>