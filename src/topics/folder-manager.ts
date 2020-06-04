import { FileInfo, FolderInfo } from '@/models';

export function useFolderManager(rootFolder: FolderInfo) {
    let addFile = (file: FileInfo, to: FolderInfo) => {
        let found = findFolder(rootFolder, to);
        if (found) {
            found.files.push(file);
        }
    };

    let removeFile = (file: FileInfo) => {
        let found = findParentFolderOfFile(rootFolder, file);
        if (found) {
            let index = found.files.findIndex(x => x.name === file.name);
            found.files.splice(index, 1);
        }
    };

    let removeFolder = (folder: FolderInfo) => {
        let found = findParentFolderOfFolder(rootFolder, folder);
        if (found) {
            let index = found.folders.findIndex(x => x.name === folder.name);
            found.folders.splice(index, 1);
        };
    };

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
