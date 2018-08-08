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
import ComputerService from './ComputerService'
import { Constants } from '../constant/Basic'

export default {
  name: 'Den',
  mixins: [
    GodService,
    DealerService,
    ComputerService,
  ],
  data() {
    return {
      Constants: null,
      God: null,
      Players: null,
      Dealer: null,
      IsGameSet: false,
    }
  },

  beforeMount() {
    this.create()

    this.setup()
  },

  methods: {
    create() {
      this.Constants = Constants

      this.God = this.godBirth()

      this.Players = this.godCreatePlayers()

      this.Dealer = this.godCreateDealer()
    },

    setup() {
      this.dealerShuffleDeck()

      this.dealerDealCardToPlayersAtFirst()

      this.dealerPutCard()

      this.dealerTriggerCardSkillAtFirst()
    },

    put(id, handIdx) {
      if (this.isGameSet()) {
        return
      }

      if (!this.dealerPlayerIsTurnPlayer(id)) {
        return
      }

      this.computerResetPutTimer(this.autoPutAction)

      if (this.dealerCanReceiveCard(this.players[id].show(handIdx))) {
        this.dealerReceiveCard(this.players[id].pick(handIdx), id)

        // this.computerLookField(this.dealer.fieldCard())

        this.dealerCheckDone(this.players[id])

        this.dealerTriggerCardSkill()

        return
      }

      this.dealerRejectReceivingCard()

    },

    draw() {
      if (this.isGameSet()) {
        return
      }

      this.dealerDeal(this.dealerTurnPlayer())

      this.dealerGoNextTurn()

      this.computerResetPutTimer(this.autoPutAction)
    },

    reply(id, type, param) {
      this.dealerListenReply(this.players[id], type, param)

      this.computerResetPutTimer(this.autoPutAction)
    },

    den(id) {
      this.dealerJudgeDen(this.players[id])
    },

    gameSet() {
      this.IsGameSet = true

      this.computerStopPutTimer()

      this.computerStopDenTimer()
    },

    isGameSet() {
      return this.IsGameSet
    },
  }
}
</script>
