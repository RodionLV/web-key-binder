<script setup lang="ts">
defineProps({
  name: { type: String, default: '' }
})
</script>

<template>
  <label class="label__box f-col">
    <div class="label__name">
      <span>{{ name }}</span>
    </div>
    <slot></slot>
  </label>
</template>

<style scoped lang="scss">
.label {
  &__box {
    width: 100%;

    gap: 0.25em;
  }

  &__name {
    color: var(--font);
    font-size: 0.9em;
  }
}
</style>
