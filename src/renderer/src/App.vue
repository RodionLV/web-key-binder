<script setup lang="ts">
import UiButton from '@components/UI/UiButton.vue'
import UiCard from '@components/UI/UiCard.vue'
import UiLabel from '@components/UI/UiLabel.vue'
import SelectElement from '@components/SelectElement.vue'
import ShortcutInput from '@components/ShortcutInput.vue'
import SearchLine from '@components/SearchLine.vue'

import { reactive, watch } from 'vue'
import { shallowClone } from '@utils/obj_util'

declare const window: {
  __API__: MainApi
} & Window

interface Profile {
  url: ''
  binds: BindedElementAndShortcut[]
}

const profile = reactive<Profile>({
  url: '',
  binds: []
})

const viewOptions = reactive<ViewOptions>({
  selectionMode: false
})

const bind = reactive<BindedElementAndShortcut>({
  element: undefined,
  shortcut: []
})

watch(
  () => viewOptions.selectionMode,
  () => {
    window.__API__.setOptions(shallowClone(viewOptions) as ViewOptions)
  }
)

const loadPage = () => {
  window.__API__.setViewUrl(profile.url)
}

const setShortcut = () => {
  profile.binds.push(bind)
  window.__API__.setShortcut(bind)
}
</script>

<template>
  <div class="main f-row">
    <div id="view"></div>

    <div class="menu menu__box f-col">
      <ui-label name="Paste an url of a desired page:">
        <search-line
          v-model="profile.url"
          :placeholder="'https://'"
          @click="loadPage"
        />
      </ui-label>

      <ui-card class="menu__binder f-col">
        <ui-label name="Select element:">
          <select-element
            v-model:element="bind.element"
            v-model:selection-mode="viewOptions.selectionMode"
            placeholder="Isn't selected element"
          />
        </ui-label>

        <ui-label name="Set shortcut:">
          <shortcut-input
            v-model:keys="bind.shortcut"
            class="menu__shortcut"
          />
        </ui-label>

        <ui-button @click="setShortcut">Bind</ui-button>
      </ui-card>
    </div>
  </div>
</template>

<style lang="scss">
.menu {
  width: 100%;

  &__box {
    gap: 16px;
    padding: 20px 20px;
  }

  &__binder {
    gap: 12px;
  }

  &__shortcut {
    height: 2.2rem;
  }
}
</style>
