<script setup lang="ts">
import UiButton from '@components/UI/UiButton.vue'
import ShortcutInput from '@components/ShortcutInput.vue'
import SearchLine from '@components/SearchLine.vue'

import { reactive } from 'vue'

declare const window: {
  __API__: MainApi
} & Window

interface Profile {
  url: ''
  viewOptions: ViewOptions
  binds: BindedElementAndShortcut[]
}

const profile = reactive<Profile>({
  url: '',
  viewOptions: {
    selectionMode: false
  },
  binds: []
})

const bind = reactive<BindedElementAndShortcut>({
  element: undefined,
  shortcut: []
})

window.__API__.onSelectedElement((elem) => {
  bind.element = elem
})

const getIndexToString = (index) => {
  return index?.id || index?.classes || 'Не выбрано'
}

const loadPage = () => {
  window.__API__.setViewUrl(profile.url)
}

const setShortcut = () => {
  profile.binds.push(bind)
  window.__API__.setShortcut(bind)
}

const toggleSelectionMode = () => {
  profile.viewOptions.selectionMode = !profile.viewOptions.selectionMode

  window.__API__.setOptions(profile.viewOptions)
}
</script>

<template>
  <div class="main f-row">
    <div id="view"></div>

    <div class="menu menu__box">
      <label>
        <div>Вставьте URL необходимой страницы:</div>
        <search-line v-model="profile.url" @click="loadPage" />
      </label>

      <div class="binder">
        <div class="f-row">
          <button @click="toggleSelectionMode">
            selection mode:
            {{ profile.viewOptions.selectionMode ? 'on' : 'off' }}
          </button>

          <div class="binder__lable">Указатель на элемент:</div>
          <div class="binder__index">
            {{ getIndexToString(bind.element) }}
          </div>
        </div>

        <shortcut-input v-model:keys="bind.shortcut" />

        <ui-button @click="setShortcut">Добавить</ui-button>
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
