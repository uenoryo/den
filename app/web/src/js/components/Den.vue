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
import { Constants } from '../constant/Basic'

export default {
  name: 'Den',
  mixins: [GodService, DealerService],
  data() {
    return {
      constants: null,
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
      this.constants = Constants
      this.god = this.godBirth()
      this.players = this.godCreatePlayers()
      this.dealer = this.godCreateDealer()

      this.dealerShuffleDeck()

      this.dealerDealCardToPlayersAtFirst()

      console.log(this.players)
    },
  }
}
</script>
