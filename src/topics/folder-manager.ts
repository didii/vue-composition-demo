import { FileInfo, FolderInfo } from '@/models';

export function useFolderManager(rootFolder: FolderInfo) {
    let addFile = (file: FileInfo, to: FolderInfo) => {
        let found = findFolder(rootFolder!, to);
        if (found) {
            found.files.push(file);
            found.files.sort((a,b) => a.name.localeCompare(b.name));
        }
    }
    let removeFile = (file: FileInfo) => {
        let found = findParentFolderOfFile(rootFolder, file);
        if (found) {
            found.files = found.files.filter(x => x.name !== file.name);
        }
    }
    let removeFolder = (folder: FolderInfo) => {
        let found = findParentFolderOfFolder(rootFolder, folder);
        if (found) {
            found.folders = found.folders.filter(x => x.name !== folder.name);
        }
    }
    return {
        addFile,
        removeFile,
        removeFolder,
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
      return findParentFolderOfFolder(root, folder);
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
