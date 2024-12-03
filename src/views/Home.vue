<template>
  <div>
    <h1>Bienvenue</h1>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const feature = ref();

    return {
      feature,
    };
  },
};
</script>

<style lang="css" scoped>

</style>