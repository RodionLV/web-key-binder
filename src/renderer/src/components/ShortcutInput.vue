<script setup lang="ts">
import UiButton from '@components/UI/UiButton.vue'

import { reactive, computed } from 'vue'

defineProps({
  keys: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:keys'])

const mapKeys = reactive({})
const keysArr = computed(() => getArrKeys(mapKeys))

const getArrKeys = (mapKeys) => {
  const arrKeys = Object.keys(mapKeys).filter((k) => mapKeys[k] == true)

  if (typeof mapKeys['key'] == 'string') {
    arrKeys.push(mapKeys['key'])
  }

  emit('update:keys', arrKeys)
  return arrKeys
}

const reset = () => {
  for (const key in mapKeys) {
    mapKeys[key] = false
  }
}

const onKeyDown = (event) => {
  event.preventDefault()
  if (event.repeat) return

  if (event.key == 'Shift') {
    mapKeys['Shift'] = true
  } else if (event.key == 'Control') {
    mapKeys['Ctrl'] = true
  } else if (event.key == 'Alt') {
    mapKeys['Alt'] = true
  } else {
    mapKeys['key'] = event.key.charAt(0).toUpperCase() + event.key.slice(1)
  }

  mapKeys['Alt'] = event.altKey
  mapKeys['Shift'] = event.shiftKey
  mapKeys['Ctrl'] = event.ctrlKey
}
</script>

<template>
  <div class="shortcut__box">
    <button class="shortcut__input" @keydown="onKeyDown">
      {{ keysArr.join(' + ') }}
    </button>

    <ui-button class="shortcut__reset" @click="reset">Сброс</ui-button>
  </div>
</template>

<style lang="scss" scoped>
.shortcut {
  &__box {
    display: flex;
    gap: 0.2em;
  }

  &__reset {
    padding: 0.2em 0.6em;
    border-radius: 0.2em;
    border: none;
  }

  &__input {
    outline: none;

    padding: 0.2em 0.6em;

    flex: 1 1 100%;
    min-width: 100px;
    height: 2em;

    background-color: silver;
    border: none;
    border-radius: 0.2em;
  }
}
</style>
