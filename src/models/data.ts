import { FolderInfo } from './folder-info';

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
                        { name: 'CompositionVersion.vue' },
                        { name: 'Folder.vue' },
                        { name: 'Modal.vue' },
                        { name: 'OptionsVersion.vue' },
                    ],
                },
                {
                    name: 'models',
                    folders: [],
                    files: [
                        { name: 'data.ts' },
                        { name: 'file-info.ts' },
                        { name: 'folder-info.ts' },
                        { name: 'index.ts' },
                    ],
                },
                {
                    name: 'topics',
                    folders: [],
                    files: [
                        { name: 'folder-manager.ts' },
                        { name: 'folder-search.ts' },
                        { name: 'index.ts' },
                        { name: 'modal.ts' },
                        { name: 'persister.ts' },
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
};