<template>
  <button class="btn btn__box">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  color: var(--font);
  background-color: var(--btn-primary);
  transition: 0.2s ease all;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;

  &:hover {
    background-color: var(--btn-primary-hover);
  }

  &__box {
    padding: 0.4rem 0.8rem 0.6rem 0.8rem;

    border-radius: 0.4rem;
    border: 0px;
  }
}
</style>
