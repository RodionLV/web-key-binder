<script setup lang="ts">
import UiButton from '@components/UI/UiButton.vue'
import UiField from '@components/UI/UiField.vue'

import SelectIcon from '@renderer/assets/icons/select-icon.svg'
import CloseIcon from '@renderer/assets/icons/close-icon.svg'

import { MainApi, BindingElement } from 'src/types/types'

declare const window: {
  __API__: MainApi
} & Window

const { selectionMode: selectionMode = false } = defineProps<{
  placeholder: string
  element?: BindingElement
  selectionMode: boolean
}>()

const emit = defineEmits(['update:element', 'update:selectionMode'])

window.__API__.onSelectedElement((elem) => {
  emit('update:element', elem)
})

const elementToString = (element) => `type: ${element.type}, id: ${element.id}`
</script>

<template>
  <div class="select__box">
    <ui-field class="select__element f-row">
      <span v-if="element" class="select__value">{{
        elementToString(element)
      }}</span>
      <span v-else class="select__placeholder">{{ placeholder }}</span>
    </ui-field>

    <ui-button
      class="select__toggle"
      @click="emit('update:selectionMode', !selectionMode)"
    >
      <img :src="selectionMode ? CloseIcon : SelectIcon" class="select__icon" />
    </ui-button>
  </div>
</template>

<style scoped lang="scss">
.select {
  &__box {
    width: 100%;

    display: flex;
    gap: 0.4em;

    font-size: 0.8em;
  }
  &__box > * {
    border-radius: 0.4em;
  }
  &__element {
    height: 100%;
    flex: 1 1 100%;
    align-items: center;
  }
  &__value {
    color: black;
  }
  &__placeholder {
    color: rgb(110, 110, 110);
  }
  &__toggle {
    height: 100%;
    width: 3em;
    height: 2.4em;

    padding: 0.4em 0.8em;
  }
  &__icon {
    width: 100%;
    height: 100%;
  }
}
</style>
