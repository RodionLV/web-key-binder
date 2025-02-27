<script setup lang="ts">
defineProps({
  keys: { type: Array<string>, default: [] }
})
// TODO: fix size field
const formatKeysForPrint = (arrKeys) => {
  if (arrKeys.length < 2) {
    return arrKeys
  }

  const size = arrKeys.length + arrKeys.length - 1
  const keys = Array(size)

  for (let i = 0; i < size; i++) {
    keys[i] = i % 2 == 0 ? arrKeys[Math.floor(i / 2)] : '+'
  }

  return keys
}
</script>

<template>
  <div>
    <span
      v-for="key in formatKeysForPrint(keys)"
      :class="[key != '+' ? 'shortcut__key' : 'shortcut__plus']"
    >
      {{ key }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.shortcut {
  &__key {
    padding: 0.2em 0.5em;

    background-color: rgb(141, 141, 141);
    box-shadow: inset 0 0 0.16em 0.16em rgba(0, 0, 0, 0.295);
    border-radius: 0.26em;

    font-weight: 500;
    font-size: 1.2em;
    color: var(--font);
  }

  &__plus {
    padding: 0 0.2em;
    color: black;
    font-size: 1.4em;
  }
}
</style>
