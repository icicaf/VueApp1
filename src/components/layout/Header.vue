<template lang="pug">
  section.hero.is-success
    .hero-body
      .container.has-text-centered
        h1.title 📻 Guayox Music
        h2.subtitle Canciones que están muy buenas...
        pm-player
</template>

<script>
import PmPlayer from '@/components/Player.vue'

export default {
  components: { PmPlayer }
}
</script>
