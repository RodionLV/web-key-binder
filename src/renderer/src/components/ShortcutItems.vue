<script setup lang="ts">
import ShortcutValue from './ShortcutValue.vue'
import UiButton from '@components/UI/UiButton.vue'

import DeleteIcon from '@renderer/assets/icons/delete-icon.svg'

import { MainWindow, ElementBindType } from 'src/types/types'

declare const window: MainWindow

const { binds = [] } = defineProps<{
  binds: ElementBindType[]
}>()

const emit = defineEmits(['deleted-bind'])

const deleteBind = async (bind: ElementBindType) => {
  console.log('delete', bind)
  if (bind?._id) {
    const n = await window.__API__.deleteById(bind._id)

    console.log(n)
    emit('deleted-bind', bind._id)
  }
}
</script>

<template>
  <div class="table table__box">
    <div class="table__row-1">id</div>
    <div class="table__row-1">type</div>
    <div class="table__row-1">shortcut</div>
    <div class="table__row-1"></div>

    <template v-for="item in binds">
      <div>{{ item.element?.id }}</div>
      <div>{{ item.element?.type }}</div>
      <div><shortcut-value :keys="item.shortcut" /></div>
      <div>
        <ui-button class="table__delete-btn" @click="deleteBind(item)">
          <div class="table__box-icon f-row all-center">
            <img :src="DeleteIcon" class="table__icon" />
          </div>
        </ui-button>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.table {
  color: var(--font);

  &__box {
    display: grid;
    grid-template-columns: 1fr 1fr 3fr minmax(2.4rem, 0.3fr);
  }

  &__row-1 {
    width: 100%;
    padding-bottom: 0.4em;

    text-transform: capitalize;
    text-indent: 0.2em;

    border-bottom: 1px solid var(--font);
  }
  &__delete-btn {
    width: 100%;
    padding: 0.2em 0.4em;
  }
  &__box-icon {
    width: 100%;
    height: 100%;
  }
  &__icon {
    width: 100%;
    height: 100%;

    // width: 12px;
  }

  &__box > *:not(.table__row-1) {
    margin-top: 0.6em;
    align-self: center;

    text-transform: lowercase;
  }
  &__box > *:nth-child(4n) {
    justify-self: center;
  }
}
</style>
