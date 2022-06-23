<template>
  <div id="options">
    <modal v-if="showNewFileModal" @onAccept="onAcceptModal($event)" @onCancel="onCancelModal()"></modal>
    <h1>Folder manager (Composition)</h1>
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
            {{rootFolder.name}}
          </h2>
          <folder
            :folderInfo="filteredFolderInfo"
            @onUpload="onUploadFile($event)"
            @onDeleteFile="onDeleteFile($event)"
            @onDeleteFolder="onDeleteFolder($event)"
          ></folder>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue";
import { useFolderManager, useModal, useLocalStorage, useFolderSearch } from "@/topics";
import { FolderInfo, FileInfo, data } from "@/models";
import Folder from "./Folder.vue";
import Modal from "./Modal.vue";

export default defineComponent({
  components: {
    Folder,
    Modal
  },
  setup() {
    // Expose to the component
    return {
      // Setup
      rootFolder: { name: 'root', folders: [], files: [] } as FolderInfo,
      // Modal
      showNewFileModal: false,
      onAcceptModal: (payload: any) => {},
      onCancelModal: () => {},
      // Manager
      onUploadFile: (file: FileInfo) => {},
      onDeleteFile: (file: FileInfo) => {},
      onDeleteFolder: (file: FileInfo) => {},
      // Filter
      filter: '',
      filteredFolderInfo: { name: 'root', folders: [], files: [] } as FolderInfo,
    };
  }
});
</script>
