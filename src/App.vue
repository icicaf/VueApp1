<template lang="pug">
  #app
    pm-nav

    pm-header

    router-view

    pm-footer
</template>

<script>

import PmNav from '@/components/layout/Nav.vue'
import PmHeader from '@/components/layout/Header.vue'
import PmFooter from '@/components/layout/Footer.vue'

export default {
  name: 'app',

  components: { PmNav, PmHeader, PmFooter }
}
</script>

<style lang="scss">
  @import './scss/main.scss';

  .results {
    margin-top: 30px;
  }

  .is-active {
    border: 3px #23d160 solid;
  }
</style>
