import { FileInfo } from './file-info';

export interface FolderInfo {
    name: string;
    folders: FolderInfo[];
    files: FileInfo[];
}
