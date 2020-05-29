import { FolderInfo } from '@/models';
import { Ref, ref, computed } from '@vue/composition-api';

/**
 * Exposes the rootFolder again, but filtered by name on the given filter.
 * @param rootFolder The folder to search through
 * @param filter Optionally a filter that was defined elsewhere or a starting value for the filter.
 */
export function useFolderSearch(rootFolder: FolderInfo, filter?: Ref<string>) {
    let actualFilter: Ref<string> = filter ? filter : ref('');
    let filteredFolders = computed(() => {
        return doFilter(rootFolder, actualFilter.value);
    });
    return {
        filter: actualFilter,
        filteredFolders,
    };
}

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
