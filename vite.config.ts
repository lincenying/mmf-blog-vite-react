import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImportus from 'vite-plugin-importus'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'

import pwaConfig from './vite.config.pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const config = {
        server: {
            port: 17778,
            proxy: {
                '/api': {
                    target: 'https://api.mmxiaowu.com',
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(/^\/api/, '/api'),
                },
            },
        },
        css: {
            preprocessorOptions: {},
        },
        resolve: {
            alias: {
                '@': path.join(__dirname, './src'),
            },
        },
        plugins: [
            react(),
            AutoImport({
                eslintrc: {
                    enabled: true,
                },
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.md$/, // .md
                ],
                imports: [
                    'react',
                    'react-router-dom',
                    'ahooks',
                    {
                        'react-redux': ['useSelector', 'useDispatch'],
                        '@/utils': ['setMessage'],
                    },
                ],
                dts: 'src/auto-imports.d.ts',
                dirs: [],

                resolvers: [],
                defaultExportByFilename: false,
                vueTemplate: false,
            }),
            vitePluginImportus([
                {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: 'index',
                },
            ]),
            ...pwaConfig(),
            UnoCSS(),
        ],
    }

    return config
})
