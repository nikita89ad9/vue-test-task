<template>
  <div class="loader"></div>
</template>

<style scoped lang="scss">
  .loader {
    display: inline-block;
    width: 24px;
    height: 24px;
  }

  .loader::after {
    content: ' ';
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 3px solid var(--color-font-secondary);
    border-color: var(--color-font-secondary) transparent var(--color-font-secondary) transparent;
    animation: loader 1.2s linear infinite;
  }

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
