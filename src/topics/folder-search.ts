import { FolderInfo } from '@/models';
import { ref, computed, Ref } from '@vue/composition-api';

export function useFolderSearch(rootFolder: Ref<FolderInfo>) {
  let filter = ref<string>('');

  let filteredFolders = computed(() => {
    return filterFolder(rootFolder.value, filter.value);
  });

  return {
    filter,
    filteredFolders,
  };
}

function filterFolder(folder: FolderInfo, filter: string): FolderInfo {
  return {
    name: folder.name,
    folders: folder.folders
      .map(x => filterFolder(x, filter))
      .filter(
        x =>
          x.name.toLowerCase().includes(filter.toLowerCase()) ||
          x.folders.length > 0 ||
          x.files.length > 0
      ),
    files: folder.files.filter(x =>
      x.name.toLowerCase().includes(filter.toLowerCase())
    )
  };
}
