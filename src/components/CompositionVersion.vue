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
import Folder from "./Folder.vue";
import Modal from "./Modal.vue";
import { useFolderManager, useModal, usePersister, useFolderSearch } from "@/topics";
import { FolderInfo, data, FileInfo } from "@/models";
import { ref, reactive, defineComponent } from "@vue/composition-api";

export default defineComponent({
  components: {
    Folder,
    Modal
  },
  setup() {
    // Create data
    let rootFolder = ref<FolderInfo>({
      name: "Loading...",
      folders: [],
      files: [],
    });

    // Use persister to keep file structure in browser
    usePersister("folders", rootFolder);

    // Use a modal
    let modal = useModal<string>();
    let onAcceptModal = (filename: string) => {
      modal.accept(filename);
    };
    let onCancelModal = () => {
      modal.cancel('');
    }

    // Use the folder manager
    let manager = useFolderManager(rootFolder.value);
    let onUploadFile = (folder: FolderInfo) => {
      // on upload: show modal and add it if accepted
      modal.trigger().then(x => {
        if (x.accepted) {
          manager.addFile({ name: x.payload }, folder);
        }
      });
    };
    let onDeleteFile = (file: FileInfo) => {
      manager.removeFile(file);
    };
    let onDeleteFolder = (folder: FolderInfo) => {
      manager.removeFolder(folder);
    };

    // Use folder search
    let search = useFolderSearch(rootFolder);

    // Expose to the component
    return {
      // Setup
      rootFolder,
      // Modal
      showNewFileModal: modal.showModal,
      onAcceptModal,
      onCancelModal,
      // Manager
      onUploadFile,
      onDeleteFile,
      onDeleteFolder,
      // Filter
      filter: search.filter,
      filteredFolderInfo: search.filteredFolders,
    };
  }
});
</script>
