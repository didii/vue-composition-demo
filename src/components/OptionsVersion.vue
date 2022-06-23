<template>
  <div id="options">
    <modal v-if="showNewFileModal" @onAccept="onAcceptModal($event)" @onCancel="onCancelModal()"></modal>
    <h1>Folder manager (Options)</h1>
    <div class="row">
      <div class="col-12">
        <input v-model="filter" type="text" class="form-control" placeholder="Search..." />
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-12">
        <div class="folder-view">
          <h2>
            <i class="far fa-folder-open"></i>
            {{ rootFolder.name }}
          </h2>
          <folder
                  :folderInfo="filteredFolderInfo"
                  @onUpload="onUploadFile($event)"
                  @onDeleteFile="onDeleteFile($event)"
                  @onDeleteFolder="onDeleteFolder($event)"></folder>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Folder from "./Folder.vue";
import Modal from "./Modal.vue";
import { FolderInfo, data, FileInfo } from "@/models";
import { defineComponent } from 'vue';

function doFilter(folder: FolderInfo, filter: string): FolderInfo {
  return {
    name: folder.name,
    folders: folder.folders
      .map(x => doFilter(x, filter))
      .filter(
        x =>
          x.name.includes(filter) ||
          x.folders.length > 0 ||
          x.files.length > 0
      ),
    files: folder.files.filter(x =>
      x.name.toLowerCase().includes(filter.toLowerCase())
    )
  };
}

function findFolder(root: FolderInfo, toFind: FolderInfo): FolderInfo | null {
  if (root.name === toFind.name) {
    return root;
  }
  for (let folder of root.folders) {
    let found = findFolder(folder, toFind);
    if (found) {
      return found;
    }
  }
  return null;
}

function findParentFolderOfFolder(root: FolderInfo, toFind: FolderInfo): FolderInfo | null {
  if (root.folders.some(x => x.name === toFind.name)) {
    return root;
  }
  for (let folder of root.folders) {
    let found = findParentFolderOfFolder(folder, toFind);
    if (found) {
      return found;
    }
  }
  return null;
}

function findParentFolderOfFile(root: FolderInfo, toFind: FileInfo): FolderInfo | null {
  for (let file of root.files) {
    if (file.name === toFind.name) {
      return root;
    }
  }
  for (let folder of root.folders) {
    let found = findParentFolderOfFile(folder, toFind);
    if (found) {
      return found;
    }
  }
  return null;
}

const OptionsVersion = defineComponent({
  components: {
    Folder,
    Modal,
  },
  data: () => ({
    rootFolder: { name: "Loading", folders: [], files: [] } as FolderInfo,
    filter: '',
    selectedFolder: null as FolderInfo | null,
    showNewFileModal: false,
  }),
  mounted() {
    let stored = localStorage.getItem("folders");
    if (stored) {
      this.rootFolder = JSON.parse(stored);
    } else {
      this.rootFolder = data;
    }
  },
  watch: {
    rootFolder(newValue: FolderInfo) {
      localStorage.setItem("folders", JSON.stringify(newValue));
    },
  },
  methods: {
    filteredFolderInfo() {
      return doFilter(this.rootFolder, this.filter);
    },
    onUploadFile(folder: FolderInfo) {
      this.showNewFileModal = true;
      this.selectedFolder = findFolder(this.rootFolder, folder);
    },
    onDeleteFile(file: FileInfo) {
      let parentFolder = findParentFolderOfFile(this.rootFolder, file);
      if (parentFolder) {
        parentFolder.files = parentFolder.files.filter(x => x.name !== file.name);
      }
    },
    onDeleteFolder(folder: FolderInfo) {
      let found = findParentFolderOfFolder(this.rootFolder, folder);
      if (found) {
        found.folders = found.folders.filter(x => x.name !== folder.name);
      }
    },
    onAcceptModal(filename: string) {
      if (this.selectedFolder) {
        this.selectedFolder.files.push({ name: filename });
        this.selectedFolder.files.sort((a, b) => a.name.localeCompare(b.name));
      }
      this.showNewFileModal = false;
    },
    onCancelModal() {
      this.selectedFolder = null;
      this.showNewFileModal = false;
    },
  }
});

export default OptionsVersion;
</script>
