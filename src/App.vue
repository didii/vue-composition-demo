<template>
  <div id="app" class="container">
    <button @click="swapVersion()" class="btn btn-primary">Swap</button>&nbsp;
    <button @click="resetData()" class="btn btn-info">Reset</button>
    <options-version v-if="useOptions"></options-version>
    <composition-version v-else></composition-version>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import OptionsVersion from "@/components/OptionsVersion.vue";
import CompositionVersion from "@/components/CompositionVersion.vue";
import Modal from "@/components/Modal.vue";
import { FolderInfo, data, FileInfo } from "@/models";

@Component({
  components: {
    OptionsVersion,
    CompositionVersion,
  },
})
export default class App extends Vue {
  private useOptions: boolean = true;

  public swapVersion() {
    this.useOptions = !this.useOptions;
  }

  public resetData() {
    localStorage.setItem('folders', JSON.stringify(data));
    location.reload();
  }
}
</script>

<style>
</style>
