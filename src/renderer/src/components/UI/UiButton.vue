
<template>
  <button class="btn__box">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn{
  &__box{
    outline: none;
    padding: 0.2em 0.6em;
    border-radius: 0.2em;
    border: 0px;
  }
}
</style>