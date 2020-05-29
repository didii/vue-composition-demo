<template>
  <div id="app" class="container">
    <!-- <button @click="swapVersion()" class="btn btn-primary">Swap</button>&nbsp;
    <button @click="resetData()" class="btn btn-info">Reset</button>
    <options-version v-if="useOptions"></options-version>
    <composition-version v-else></composition-version>-->
    <todo-composition></todo-composition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { FolderInfo, data, FileInfo } from "@/models";
import OptionsVersion from "@/components/OptionsVersion.vue";
import CompositionVersion from "@/components/CompositionVersion.vue";
import Modal from "@/components/Modal.vue";
import TodoOption from '@/components/TodoOption.vue';
import TodoComposition from '@/components/TodoComposition.vue';

@Component({
  components: {
    OptionsVersion,
    CompositionVersion,
    TodoOption,
    TodoComposition,
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
