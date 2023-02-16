const path = require('path')

import { loadEnv } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import WindiCSS from 'vite-plugin-windicss'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const config = {
        server: {
            port: 17778,
            proxy: {
                '/api': {
                    target: 'http://localhost:4000',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '/api'
                    }
                }
            }
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true
                }
            }
        },
        plugins: [
            reactRefresh(),
            createStyleImportPlugin({
                resolves: [AndDesignVueResolve()],
                libs: [
                    // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
                    {
                        libraryName: 'ant-design-vue',
                        esModule: true,
                        resolveStyle: name => {
                            return `ant-design-vue/es/${name}/style/index`
                        }
                    }
                ]
            }),

            VitePWA({
                // mode: 'development',
                base: '/',
                manifest: {
                    name: 'M.M.F小屋',
                    short_name: 'M.M.F小屋',
                    theme_color: '#54d9e0',
                    background_color: '#ffffff',
                    icons: [
                        {
                            src: '/static/img/icons/android-chrome-48x48.png',
                            sizes: '48x48',
                            type: 'image/png'
                        },
                        {
                            src: '/static/img/icons/android-chrome-72x72.png',
                            sizes: '72x72',
                            type: 'image/png'
                        },
                        {
                            src: '/static/img/icons/android-chrome-96x96.png',
                            sizes: '96x96',
                            type: 'image/png'
                        },
                        {
                            src: '/static/img/icons/msapplication-icon-144x144.png',
                            sizes: '144x144',
                            type: 'image/png'
                        },
                        {
                            src: '/static/img/icons/android-chrome-168x168.png',
                            sizes: '168x168',
                            type: 'image/png'
                        },
                        {
                            src: '/static/img/icons/android-chrome-192x192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: '/static/img/icons/android-chrome-512x512.png',
                            sizes: '512x512',
                            type: 'image/png'
                        }
                    ],
                    start_url: '/',
                    display: 'standalone',
                    lang: 'zh-CN'
                },
                workbox: {
                    cacheId: 'mmf-blog-vite-react',
                    runtimeCaching: [
                        {
                            urlPattern: /api/,
                            handler: 'NetworkFirst',
                            options: {
                                networkTimeoutSeconds: 1,
                                cacheName: 'api-cache',
                                cacheableResponse: {
                                    statuses: [0, 200]
                                }
                            }
                        },
                        {
                            urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
                            handler: 'NetworkFirst',
                            options: {
                                networkTimeoutSeconds: 1,
                                cacheName: 'cdn-cache',
                                cacheableResponse: {
                                    statuses: [0, 200]
                                }
                            }
                        },
                        {
                            urlPattern: /^https:\/\/fdn\.geekzu\.org/,
                            handler: 'NetworkFirst',
                            options: {
                                networkTimeoutSeconds: 1,
                                cacheName: 'avatar-cache',
                                cacheableResponse: {
                                    statuses: [0, 200]
                                }
                            }
                        }
                    ]
                }
            }),
            WindiCSS({
                scan: {
                    // all files in the cwd
                    dirs: ['.'],
                    // also enabled scanning for vue/js/ts
                    fileExtensions: ['jsx', 'js']
                }
            })
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src')
            }
        }
    }
    if (mode === 'development') {
    }
    return config
}
