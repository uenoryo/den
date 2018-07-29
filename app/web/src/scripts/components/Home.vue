<template>
  <div class='home'>
    <h1>{{ message }}</h1>
    <router-link :to="{ name: 'game' }">Game</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      message: 'Den',
    }
  }
}
</script>
