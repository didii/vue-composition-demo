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
import { Vue, Component, Watch } from "vue-property-decorator";
import { ref, reactive, defineComponent } from "@vue/composition-api";
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
    // Setup variables
    let rootFolder = ref<FolderInfo>(data);

    // Use local storage
    useLocalStorage('folders', rootFolder);

    // Use modal
    let modal = useModal<string>();
    
    // Use folder manager
    let manager = useFolderManager(rootFolder.value);
    let onUploadFile = (folder: FolderInfo) => {
      modal.trigger().then((filename: string) => {
        manager.addFile({name: filename}, folder);
      });
    };

    // Use folder search
    let search = useFolderSearch(rootFolder);

    // Expose to the component
    return {
      // Setup
      rootFolder: rootFolder,
      // Modal
      showNewFileModal: modal.showModal,
      onAcceptModal: modal.accept,
      onCancelModal: modal.cancel,
      // Manager
      onUploadFile: onUploadFile,
      onDeleteFile: manager.removeFile,
      onDeleteFolder: manager.removeFolder,
      // Filter
      filter: search.filter,
      filteredFolderInfo: search.filteredFolders,
    };
  }
});
</script>
