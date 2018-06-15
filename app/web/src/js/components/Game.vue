<template>
  <div class='game'>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import God from '@/models/God'
import Config from '@/config'
import Constants from '@/constants'

export default {
  name: 'Game',
  data() {
    return {
      message: 'Play',
      god: null,
      players: null,
    }
  },
  mounted () {
    this.god = new God(Config)
    this.setup()
  },
  methods: {
    setup () {
      // Create entry player
      this.players = this.god.createPlayers()
    },
  }
}
</script>
