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
      Constants: null,
      God: null,
      Players: null,
      Dealer: null,
    }
  },

  beforeMount() {
    this.setup()
  },

  methods: {
    setup() {
      this.Constants = Constants
      this.God = this.godBirth()
      this.Players = this.godCreatePlayers()
      this.Dealer = this.godCreateDealer()

      this.dealerShuffleDeck()

      this.dealerDealCardToPlayersAtFirst()

      this.dealerPutCard()

      this.dealerTriggerCardSkillAtFirst()
    },
  }
}
</script>
