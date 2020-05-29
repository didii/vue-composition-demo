<template>
  <ul class="folder-list">
    <li v-for="folder of folderInfo.folders" :key="folder.name" class="folder">
      {{folder.name}}&nbsp;
      <a href="#" @click="onUploadClicked(folder)" title="Upload" class="text-success">
        <i class="fas fa-plus-circle"></i>
      </a>&nbsp;
      <a href="#" @click="onDeleteFolderClicked(folder)" title="Delete" class="text-danger">
        <i class="fas fa-minus-circle"></i>
      </a>
      <folder
        v-if="hasNestedItems(folder)"
        :folderInfo="folder"
        @onUpload="onUploadClicked($event)"
        @onDeleteFolder="onDeleteFolderClicked($event)"
        @onDeleteFile="onDeleteFileClicked($event)"
      ></folder>
    </li>
    <li v-for="file of folderInfo.files" :key="file.name" class="file">
      {{file.name}}&nbsp;
      <a href="#" @click="onDeleteFileClicked(file)" title="Delete" class="text-danger">
        <i class="fas fa-minus-circle"></i>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { FolderInfo, FileInfo } from "@/models";

@Component
export default class Folder extends Vue {
  @Prop({ required: true, type: Object }) public folderInfo!: FolderInfo;

  public hasNestedItems(folderInfo: FolderInfo): boolean {
    return folderInfo.folders.length > 0 || folderInfo.files.length > 0;
  }

  public onUploadClicked(folder: FolderInfo) {
    this.$emit("onUpload", folder);
  }

  public onDeleteFolderClicked(folder: FolderInfo) {
    this.$emit("onDeleteFolder", folder);
  }

  public onDeleteFileClicked(file: FileInfo) {
    this.$emit("onDeleteFile", file);
  }
}
</script>

<style scoped>
.fas,
.far {
  font-size: 12px;
}

.folder-list {
  list-style: none;
  padding: 0;
}
.folder-list > li {
  padding-left: 1.3em;
}
.folder-list > li:before {
  font-family: "Font Awesome 5 Free";
  display: inline-block;
  margin-left: -1.3em;
  width: 1.3em;
}
.folder-list > li.folder:before {
  content: "\f07c";
}
.folder-list > li.file:before {
  content: "\f15b";
}

</style>