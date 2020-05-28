<template>
  <div id="app" class="container">
    <h1>Folder manager</h1>
    <div class="row">
      <div class="col-12">
        <input v-model="filter" type="text" class="form-control" placeholder="Search..." />
      </div>
    </div>
    <hr/>
    <div class="row">
      <div class="col-12">
        <div class="folder-view">
          <h2>
            <i class="far fa-folder-open"></i>
            {{rootFolder.name}}
          </h2>
          <folder :folderInfo="filteredFolderInfo"></folder>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Folder from "./components/Folder.vue";
import { FolderInfo, data } from "./models/resource";

@Component({
  components: {
    Folder
  }
})
export default class App extends Vue {
  private rootFolder: FolderInfo = { ...data };
  private filter: string = "";

  public get filteredFolderInfo(): FolderInfo {
    return this.doFilter(this.rootFolder, this.filter);
  }

  private doFilter(folder: FolderInfo, filter: string): FolderInfo {
    return {
      name: folder.name,
      folders: folder.folders
        .map(x => this.doFilter(x, filter))
        .filter(
          x =>
            x.name.includes(filter) ||
            x.folders.length > 0 ||
            x.files.length > 0
        ),
      files: folder.files.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
    };
  }
}
</script>

<style>
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
