export interface FolderInfo {
    name: string;
    folders: FolderInfo[];
    files: FileInfo[];
}

export interface FileInfo {
    name: string;
}

export let data: FolderInfo = {
    name: 'composition-demo',
    folders: [
        {
            name: 'node_modules',
            folders: [],
            files: [],
        },
        {
            name: 'public',
            folders: [],
            files: [
                { name: 'favicon.ico' },
                { name: 'index.html' },
            ],
        },
        {
            name: 'src',
            folders: [
                {
                    name: 'assets',
                    folders: [],
                    files: [
                        { name: 'logo.png' }
                    ],
                },
                {
                    name: 'components',
                    folders: [],
                    files: [
                        { name: 'Folder.vue' }
                    ],
                },
                {
                    name: 'models',
                    folders: [],
                    files: [
                        { name: 'resource.ts' }
                    ],
                },
            ],
            files: [
                { name: 'App.vue' },
                { name: 'main.ts' },
                { name: 'shims-tsx.d.ts' },
                { name: 'shims-vue.d.ts' },
            ],
        }
    ],
    files: [
        { name: '.browserslistrc' },
        { name: '.eslintrc.js' },
        { name: '.gitignore' },
        { name: 'babel.config.js' },
        { name: 'package-lock.json' },
        { name: 'package.json' },
        { name: 'README.md' },
        { name: 'tsconfig.json' },
        { name: 'vue.config.js' },
    ],
}