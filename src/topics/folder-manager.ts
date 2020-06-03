import { FileInfo, FolderInfo } from '@/models';
import { Ref } from '@vue/composition-api';

/**
 * Exposes functionality to add files and remove folders or files from the given parameter.
 * @param rootFolder The folder to manage
 */
export function useFolderManager(rootFolder: Ref<FolderInfo>) {
    let addFile = (file: FileInfo, to: FolderInfo) => {
        let found = findFolder(rootFolder.value, to);
        if (found) {
            found.files.push(file);
            found.files.sort((a, b) => a.name.localeCompare(b.name));
        }
    };

    let deleteFile = (file: FileInfo) => {
        let found = findParentFolderOfFile(rootFolder.value, file);
        if (found) {
            found.files = found.files.filter(x => x.name !== file.name);
        }
    };

    let deleteFolder = (folder: FolderInfo) => {
        let found = findParentFolderOfFolder(rootFolder.value, folder);
        if (found) {
            found.folders = found.folders.filter(x => x.name !== folder.name);
        }
    };

    return {
        addFile,
        deleteFile,
        deleteFolder,
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
