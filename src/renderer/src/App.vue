<script setup>
import UiButton from '@components/UI/UiButton.vue'
import ShortcutInput from '@components/ShortcutInput.vue'

import { reactive, watch } from 'vue'

let setup = reactive({
  url: '',
  selectedHandle: null,
  keys: []
})

watch(
  ()=>setup.keys,
  ()=>console.log(setup.keys)
)

// window.__API__.onSelectedBtn((value) => {
//   console.log(value)
// })

const loadPage = () => {
  window.__API__.setViewUrl(setup.url)
}
</script>

<template>
  <div class="main f-row">
    <div id="view"></div>

    <div class="menu menu__box">
      <label>
        <div>Вставьте URL необходимой страницы:</div>
        <input v-model="setup.url" />
      </label>
      <ui-button @click="loadPage">Загрузить страницу</ui-button>

      <div class="binder">
        <shortcut-input v-model:keys="setup.keys"/>

        <div class="binder__list"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main {
}
.menu {
  &__box {
    padding: 20px 20px;
  }
}
</style>
