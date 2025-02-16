<template>
  <button class="btn btn__box">
    <span class="btn__label">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  position: relative;
  cursor: pointer;
  color: var(--font);
  background-color: var(--btn-primary);
  transition: 0.2s ease all;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;

  overflow: hidden;

  &__label {
    position: relative;
    z-index: 2;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    transform: scale(0);
    border-radius: 50%;
  }

  &:hover::after {
    background-color: var(--btn-primary-hover);
    transform: scale(1.5);
  }

  &:active::after {
    animation-name: btnActive;
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
  }

  &__box {
    padding: 0.4rem 0.8rem 0.6rem 0.8rem;

    border-radius: 0.4rem;
    border: 0px;

    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
}

@keyframes btnActive {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1.5);
  }
}
</style>
