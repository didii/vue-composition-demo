<template>
  <div id="app" class="container">
    <button @click="swapVersion()" class="btn btn-primary">Swap</button>&nbsp;
    <button @click="resetData()" class="btn btn-info">Reset</button>
    <options-version v-if="useOptions"></options-version>
    <composition-version v-else></composition-version>
  </div>
</template>

<script lang="ts">
import { data } from "@/models";
import { defineComponent } from 'vue';
import OptionsVersion from './components/OptionsVersion.vue';
import CompositionVersion from './components/CompositionVersion.vue';

const App = defineComponent({
  components: {
    OptionsVersion,
    CompositionVersion,
  },
  data: () => ({
    useOptions: false,
  }),
  methods: {
    swapVersion() {
      this.useOptions = !this.useOptions;
    },
    resetData() {
      localStorage.setItem('folders', JSON.stringify(data));
      location.reload();
    },
  },
});

export default App;
</script>

<style>
</style>
