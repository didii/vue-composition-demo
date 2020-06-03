import { FolderInfo } from '@/models';

export function useFolderSearch() {

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
