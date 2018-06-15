<template>
  <div class='game'>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import Player from '@/models/Player'

export default {
  name: 'Game',
  data () {
    return {
      message: 'Play',
    }
  },
  mounted () {
    let p = new Player("test")
    console.log(p)
  }
}
</script>
