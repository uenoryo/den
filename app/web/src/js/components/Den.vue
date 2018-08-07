<template>
  <div class='gameContainer' id='View'>
    <div class='ads'>
      ads
    </div>
  </div>
</template>

<script>
import GodService from './GodService'
import DealerService from './DealerService'

export default {
  name: 'Den',
  mixins: [GodService],
  data() {
    return {
      god: null,
      players: null,
      dealer: null,
    }
  },

  beforeMount() {
    this.setup()
  },

  methods: {
    setup() {
      this.god = this.godBirth()
      this.players = this.godCreatePlayers()
      this.dealer = this.godCreateDealer()
      console.log(this.dealer)
    },
  }
}
</script>
