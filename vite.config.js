import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver, NaiveUiResolver} from 'unplugin-vue-components/resolvers'

export default defineConfig({
    base: "./",
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: [
                'vue',
                {
                    'naive-ui': [
                        'useDialog',
                        'useMessage',
                        'useNotification',
                        'useLoadingBar'
                    ]
                }
            ]
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
                NaiveUiResolver()
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
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
