<template lang="pug">
  main

    transition(name="move")
      pm-notification(v-show="showNotification", :typeNotification="hasData > 0 ? 'is-success' : 'is-danger'")
        p(slot="body")
          span(v-if="hasData > 0") Se encontraron {{ hasData }} resultados
          span(v-else) No se encontraron resultados

    transition(name="move")
      pm-Loader(v-show="isLoading")

    section
      .column
        .field.has-addons.has-addons-centered
          .control
            input.input.is-large(
              type="text",
              placeholder="Buscar canciones",
              v-model="searchQuery",
              @keyup.enter="search"
            )
          .control
            a.button.is-info.is-large(@click="search") Buscar
            p.is-default.is-large {{ searchMessage }}

    section.section(v-show="!isLoading")
      .columns
        .column.is-full
          .container.results
            .columns.is-multiline
              .column.is-one-quarter(v-for="t in tracks")

                pm-track(
                  v-blur="t.preview_url"
                  :class="{ 'is-active': t.id === selectedTrack }",
                  :track="t",
                  @select="setSelectedTrack"
                )

</template>

<script>

import trackService from '@/services/track'

import PmTrack from '@/components/Track.vue'

import PmNotification from '@/components/shared/Notification.vue'
import PmLoader from '@/components/shared/Loader.vue'

export default {
  name: 'app',

  components: { PmTrack, PmLoader, PmNotification },

  data () {
    return {
      searchQuery: '',
      tracks: [],
      showValue: false,
      notification: true,
      isLoading: false,
      selectedTrack: '',
      showNotification: false,
      hasData: false
    }
  },

  methods: {

    setSelectedTrack (id) {
      this.selectedTrack = id
    },

    search () {
      if (!this.searchQuery) { return }

      this.isLoading = true

      trackService.search(this.searchQuery)
        .then(res => {
          // console.log(res)
          this.tracks = res.tracks.items
          this.isLoading = false
          this.showNotification = true
          this.hasData = res.tracks.total // si es mayor a 0 es success de lo contrario es false
          // console.log(this.tracks)
        })
    }
  },

  computed: {
    totalTime: function () {
      let worked = 0
      this.tasks.forEach((task) => {
        worked += parseInt(task.time)
      })
      return worked
    },

    searchMessage () {
      return `Encontradas ${this.tracks.length}`
    }
  },

  watch: {
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .results {
    margin-top: 30px;
  }

  .is-active {
    border: 3px #23d160 solid;
  }

  #buscar {
    margin: 20px;
  }
</style>
