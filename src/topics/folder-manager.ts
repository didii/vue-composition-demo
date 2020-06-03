import { FileInfo, FolderInfo } from '@/models';

/**
 * Exposes functionality to add files and remove folders or files from the given parameter.
 * @param rootFolder The folder to manage
 */
export function useFolderManager(rootFolder: FolderInfo) {
    
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
