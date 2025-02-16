<script setup lang="ts">
import UiButton from '@components/UI/UiButton.vue'

import SelectIcon from '@renderer/assets/icons/select-icon.svg'
import CloseIcon from '@renderer/assets/icons/close-icon.svg'

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
    <div class="select__element">
      <span v-if="element" class="select__value">{{ elementToString(element) }}</span>
      <span v-else class="select__placeholder">{{ placeholder }}</span>
    </div>
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

    max-height: 2rem;
    height: 100%;

    font-size: 0.8em;
  }
  &__box > * {
    border-radius: 0.4em;
  }
  &__element {
    height: 100%;
    flex: 1 1 100%;
    display: flex;
    align-items: center;

    padding: 0 0.8em;

    background-color: var(--bg-input);
    border: 2px solid rgb(105, 105, 105);
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
