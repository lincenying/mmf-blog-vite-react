import { readFile } from 'node:fs/promises'
import lincy from '@lincy/eslint-config'

const autoImport = JSON.parse(
    await readFile(new URL('./.eslintrc-auto-import.json', import.meta.url)),
)

const config = lincy(
    {
        vue: false,
        formatters: true,
        unocss: true,
        overrides: {
            stylistic: {
                'antfu/consistent-list-newline': 'off',
                'style/jsx-max-props-per-line': ['error', { maximum: 4 }],
            },
            react: {
                'react-dom/no-dangerously-set-innerhtml': 'off',
            },
            ignores: [
                '**/assets',
                '**/static',
            ],
        },
    },
    {
        languageOptions: {
            globals: {
                ...autoImport.globals,
            },
        },
    },
)

export default config
