<template>
  <NavBar v-if="!this.$store.state.isEditorView"></NavBar>
  <router-view style="flex-grow: 1;" />
</template>

<script>

import './app.css'
import NavBar from './components/header'

export default {
  name: 'App',

  data() {
    return {
      isEditorView: false,
      currentRout: null
    }
  },

  components: {
    NavBar,
  },

  beforeCreate() {
    this.$store.commit('initializeStore')
  },

  watch: {
    '$route.path'(newPath) {
      if (newPath === '/editor') {
        this.$store.commit('setIsEditorView', true)
      } else {
        this.$store.commit('setIsEditorView', false)
      }
    }
  },
}
</script>

<style>
body {
  margin: 0;
}
</style>
