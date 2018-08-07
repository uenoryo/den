<template>
  <div class='gameContainer' id='View'>
    <div class='ads'>
      ads
    </div>
  </div>
</template>

<script>
import GodService from './GodService'

export default {
  name: 'Den',
  mixins: [GodService],
  data() {
    return {
      env: null,
      confing: null,
      constants: null,
      rule: null,
      players: null,
      isGameSet: false,
    }
  },

  beforeMount() {
    this.setup()
  },

  methods: {
    setup() {
      this.god = this.godBirth()
      this.players = this.godCreatePlayers()
    },
  }
}
</script>
