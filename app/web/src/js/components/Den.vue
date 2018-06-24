<template>
  <div class='game'>
    <div class='hands'>
      <div v-for='player, id in players' class='PlayerCardArea' :class='["PlayerCardArea__ID" + id]'>
        <div
          v-for='card, handIdx in player.hand.Cards'
          @click='put(id, handIdx)'
          class='Card'
          :class='["Card__ID" + card.score()]'>
          [{{ card.toString() }}]
        </div>
      </div>
    </div>
    <div class='field'>
      <h1>フィールド</h1>
      <div>
        <span v-if='dealer.fieldCard() !== null'>
          [{{ dealer.fieldCard().toString() }}]
        </span>
        <span v-else>
          [何も出ていない]
        </span>
      </div>
    </div>
    <br>
    <div class='deck'>
      <h1>デッキ</h1>
      <div>残り: {{ dealer.deck.cardNum() }}枚</div>
    </div>
    <div class='controller'>
      <button @click='draw()'>カードを引く</button>
    </div>
  </div>
</template>

<style>
  body {
    background-color: #ccc;
  }
</style>

<script>
import Config from '@/config'
import Constants from '@/constants'
import Dealer from '@/components/Dealer'
import Computer from '@/components/Computer'
import Rule from '@/models/Rule'

export default {
  name: 'Den',
  mixins: [Dealer, Computer],
  data() {
    return {
      players: null,
    }
  },
  beforeMount () {
    this.setup()
    this.computerStandby(this.autoPutAction, this.autoDenAction)
  },
  methods: {
    setup () {
      this.players = this.god.createPlayers()

      this.dealerShuffleDeck()

      this.dealerDealCardToPlayersAtFirst()

      this.dealerPutCard()
    },
    put (id, handIdx) {
      if (! this.dealerPlayerIsTurnPlayer(id)) {
        return
      }

      if (this.dealerCanReceiveCard(this.players[id].show(handIdx))) {
        this.dealerReceiveCard(this.players[id].pick(handIdx))

        this.dealerCheckDone(this.players[id])

        this.dealerTriggerCardSkill()
      } else {
        this.dealerRejectReceivingCard()
      }
    },
    draw () {
      this.dealerDeal(this.dealerTurnPlayer().data.ID)
      this.dealerGoNextTurn()
    },
    den (id) {
      this.dealerJudgeDen(this.players[id])
    },
    autoPutAction() {
      if (! this.dealerTurnPlayer().isComputer()) {
        return
      }

      if (this.dealerTurnPlayer().wantPut(this.dealer.fieldCard())) {
        this.put(
          this.dealerTurnPlayer().data.ID,
          this.dealerTurnPlayer().think(this.dealer.fieldCard())
        )
      } else {
        this.draw()
      }
    },
    autoDenAction() {
      if (! this.dealerTurnPlayer().isComputer()) {
        return
      }

      this.dealerJudgeDen(this.dealerTurnPlayer())
    },
  }
}
</script>
