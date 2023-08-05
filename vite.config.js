import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
    base: "./",
    plugins: [
        vue(),
        AutoImport({
            resolvers: [
                ElementPlusResolver(),
                // 自动引入图标组件
                IconsResolver({
                    prefix: 'Icon',
                })
            ],
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: '0.0.0.0'
    },
    define: {
        // 关闭vue-i18n的完整安装
        __VUE_I18N_FULL_INSTALL__: false,
        // 关闭vue-i18n的旧版API
        __VUE_I18N_LEGACY_API__: false,
        // 关闭vue-i18n的生产环境开发者工具
        __VUE_I18N_PROD_DEVTOOLS__: false,
        // 关闭intlify的生产环境开发者工具
        __INTLIFY_PROD_DEVTOOLS__: false,
    },
});
