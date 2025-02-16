<template>
  <div class="card__box">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  &__box {
    padding: 1rem 1rem 1.2rem 1rem;

    background-color: rgba(255, 255, 255, 0.14);
    border-radius: 0.8rem;
  }
}
</style>
