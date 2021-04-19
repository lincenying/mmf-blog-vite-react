const path = require('path')
import reactRefresh from '@vitejs/plugin-react-refresh'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
// import WindiCSS from 'vite-plugin-windicss'
import styleImport from 'vite-plugin-style-import'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default ({ mode }) => {
    const config = {
        server: {
            port: 7778,
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
            getBabelOutputPlugin(),
            reactRefresh(),
            styleImport({
                libs: [
                    {
                        libraryName: 'ant-design-vue',
                        esModule: true,
                        resolveStyle: name => {
                            return `ant-design-vue/es/${name}/style/index`
                        }
                    },
                    {
                        libraryName: 'antd',
                        esModule: true,
                        resolveStyle: name => {
                            return `antd/es/${name}/style/index`
                        }
                    },
                    {
                        libraryName: 'vant',
                        esModule: true,
                        resolveStyle: name => {
                            return `vant/es/${name}/style/index`
                        }
                    },
                    {
                        libraryName: 'element-plus',
                        resolveStyle: name => {
                            return `element-plus/lib/theme-chalk/${name}.css`
                        },
                        resolveComponent: name => {
                            return `element-plus/lib/${name}`
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
            })
            // WindiCSS({
            //     safelist: 'prose prose-sm m-auto text-left'
            // })
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
