<template lang="pug">
  #app

    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </nav>

    pm-header

    <div class="columns">
      <div class="column">
        <header class="hero is-primary">
          <div class="hero-body">
            <div class="container">
              <h1 class="title"> {{nameDos}} </h1>
              <h2 class="subtitle">
                Increase your productivity!
              </h2>
            </div>
          </div>
        </header>
        <section class="container">
          <div class="box">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input class="input" type="text" placeholder="e.g Study vue" ref="firstInput" v-model="newTask.title">
              </div>
            </div>
            <div class="field">
              <label class="label">Time (hours)</label>
              <div class="control">
                <input class="input" type="number" placeholder="e.g. 10" v-model="newTask.time">
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" @click="addTask">Submit</button>
              </div>
              <div class="control">
                <button class="button is-link is-light" @click="resetForm">Cancel</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="column">
        <div class="box has-background-white-ter">
          <h1 class="title">Task List 📝</h1>
          <h2 class="subtitle">Worked time: {{totalTime}} hours</h2>
          <p class="notification is-info" v-if="notification">
            <strong>There are not tasks in list. Add one left.</strong>
          </p>
          <article class="notification is-success" v-for="(task, index) in tasks">
            <button class="delete" @click="removeTask(index)"></button>
            <h3><strong>{{task.title}}</strong></h3>
            <h5>{{task.time}} hours</h5>
          </article>
        </div>
      </div>
    </div>

    section.section
      nav
        .field.has-addons
          .control.is-expanded
            input.input.is-large(
              type="text",
              placeholder="Buscar canciones",
              v-model="searchQuery"
            )
          .control
            a.button.is-info.is-large(@click="search") Buscar
          .control
            a.button.is-danger.is-large &times;
          .control
            a.button.is-default.is-large {{ searchMessage }}

        .container.results
          .rows
            .row(v-for="t in tracks")
              | {{ t.name }} - {{ t.artists[0].name }}

    child

    img(src="./assets/logo.png")
    h1 {{ msg }}
    p {{1+1}}
    p {{ person.name.toUpperCase()}}
    p(v-show="showValue") {{ value }}
    p(v-if="showValue") {{ value }}
    p(v-else-if="showValue") {{ 'algo mas' }}
    p(v-else="showValue") {{ 'algo mas 2' }}

    ul
      li(v-for="i in items") {{ i }}

    input(v-model="name")
    p {{ name }}

    a(:href="url") Link

    br

    input(v-model="lastName")

    p {{ fullName }}

    br
    h1 {{ 'CALCULA EDAD' }}

    p {{ "Fecha de nacimiento" }}
    input(v-model="fechaNacimiento" type="date")

    p {{ "Su edad es : " + calculaEdad }}

    button(@click="format") Format

    p {{ formattedName}}

    pm-footer

</template>

<script>
import trackService from './services/track'
import PmFooter from './components/layout/Footer.vue'
import PmHeader from './components/layout/Header.vue'

export default {
  name: 'app',

  components: { PmFooter, PmHeader },

  data () {
    return {
      searchQuery: '',
      tracks: [],

      msg: 'Hola Vue!',

      person: {
        name: 'Cristian Aguayo'
      },

      showValue: false,
      value: 'Algo',

      items: [1, 2, 3, 4, 5],

      name: '',
      lastName: '',
      url: 'https://scap.cl',

      fechaNacimiento: '',

      fechaActual: new Date(),

      formattedName: '',

      nameDos: '📓 Tasks Manager',

      notification: true,
      tasks: [],
      newTask: {
        title: '',
        time: 0
      }
    }
  },

  created () {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || []
    this.tasks.length ? this.notification = false : this.notification = true
  },

  methods: {

    format () {
      this.formattedName = this.name.split(' ').join('-').toUpperCase()
    },

    search () {
      if (!this.searchQuery) { return }

      trackService.search(this.searchQuery)
        .then(res => {
          console.log(res)
          this.tracks = res.tracks.items
          console.log(this.tracks)
        })
    },

    addTask () {
      const task = this.newTask
      if (task.title && task.time) {
        this.notification = false
        this.tasks.push({ ...task })
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
        this.resetForm()
      }
    },

    removeTask: function (index) {
      const tasks = this.tasks
      tasks.splice(index, 1)
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      tasks.length ? (this.notification = false) : (this.notification = true)
    },

    resetForm: function () {
      const task = this.newTask
      task.title = ''
      task.time = 0
      this.$refs.firstInput.focus()
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

    fullName () {
      return `${this.name} ${this.lastName}`
    },

    searchMessage () {
      return `En contrados: ${this.tracks.length}`
    },

    calculaEdad () {
      var edad = 0
      if (this.fechaNacimiento) {
        var fechaActual = new Date().getFullYear()
        var fechaNacimiento = new Date(this.fechaNacimiento).getFullYear()
        edad = fechaActual - fechaNacimiento + ' Años'
      }
      return edad
    }
  },

  watch: {
    name (newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';

  .results {
    margin-top: 30px;
  }
</style>
