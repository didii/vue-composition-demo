import { FolderInfo } from '@/models';
import { Ref, ref, computed } from '@vue/composition-api';

/**
 * Exposes the rootFolder again, but filtered by name on the given filter.
 * @param rootFolder The folder to search through
 */
export function useFolderSearch(rootFolder: Ref<FolderInfo>) {

}

function filterFolder(folder: FolderInfo, filter: string): FolderInfo {
    return {
      name: folder.name,
      folders: folder.folders
        .map(x => filterFolder(x, filter))
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
