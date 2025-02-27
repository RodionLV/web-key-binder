<template>
  <div class="field__box">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.field {
  &__box {
    padding: 0.4em 0.8em;

    background-color: var(--bg-input);
    border: 2px solid rgb(105, 105, 105);

    border-radius: 0.4em;
  }
}
</style>
