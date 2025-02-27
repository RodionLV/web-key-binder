<script setup lang="ts">
import UiButton from '@components/UI/UiButton.vue'
import UiField from '@components/UI/UiField.vue'
import ShortcutValue from '@components/ShortcutValue.vue'

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
    <button class="shortcut__assign" @keydown="onKeyDown">
      <ui-field class="shortcut__field f-row.all-center">
        <shortcut-value :keys="keysArr" class="f-row.v-center" />
      </ui-field>
    </button>

    <ui-button class="shortcut__reset" @click="reset">reset</ui-button>
  </div>
</template>

<style lang="scss" scoped>
.shortcut {
  &__box {
    display: flex;
    gap: 0.2em;
  }

  &__reset {
    flex: 1 0 100%;
    max-width: 80px;
    padding: 0 0.8em;
    border-radius: 0.2em;
    border: none;
  }

  &__assign {
    background: none;
    flex: 1 1 100%;
  }

  &__field {
    height: 100%;
  }
}
</style>
