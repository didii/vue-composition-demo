<template>
  <ul class="folder-list">
    <li v-for="folder of folderInfo.folders" :key="folder.name" class="folder">
        {{folder.name}}
        <folder v-if="hasNestedItems(folder)" :folderInfo="folder"></folder>
    </li>
    <li v-for="file of folderInfo.files" :key="file.name" class="file">
        {{file.name}}
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { FolderInfo, FileInfo } from "../models/resource";

@Component
export default class Folder extends Vue {
  @Prop({required: true, type: Object}) public folderInfo!: FolderInfo;

  public hasNestedItems(folderInfo: FolderInfo): boolean {
      return folderInfo.folders.length > 0 || folderInfo.files.length > 0;
  }
}
</script>

<style scoped>
.fas, .far {
    font-size: 12px;
}
</style>