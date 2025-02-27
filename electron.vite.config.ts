import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        // '@my-types': resolve('src/types')
      }
    }
  },
  preload: {
    build: {
      lib: {
        entry: [
          './src/preload/preload_view.ts',
          './src/preload/preload_main.ts'
        ]
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@my-types': resolve('src/types'),
        '@renderer': resolve('src/renderer/src'),
        '@components': resolve('src/renderer/src/components'),
        '@utils': resolve('src/utils')
      }
    },
    plugins: [vue()]
  }
})
