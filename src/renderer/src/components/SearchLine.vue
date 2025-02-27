<script setup lang="ts">
import SearchIcon from '@renderer/assets/icons/search-icon.svg'

const { modelValue: url } = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' }
})

const emit = defineEmits(['update:load', 'update:modelValue'])

const onInput = (e) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="search-line__box f-row">
    <input
      class="search-line__url"
      :placeholder="placeholder"
      :value="url"
      @input="onInput"
    />
    <button class="search-line__btn" @click="emit('update:load', null)">
      <img :src="SearchIcon" class="search-line__icon" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.search-line {
  &__box {
    width: 100%;

    flex-wrap: nowrap;
    gap: 2px;

    height: 1.8em;

    font-size: 1rem;
  }

  &__url {
    flex: 1 1 100%;
    padding: 0 1em;

    border-radius: 0.8em 0 0 0.8em;
  }

  &__btn {
    overflow: hidden;
    padding: 0.4em 0.8em 0.4em 0.4em;

    background-color: white;
    border-radius: 0 0.8em 0.8em 0;
  }

  &__icon {
    width: 100%;
    height: 100%;
  }
}
</style>
