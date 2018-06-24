<template>
  <div class='game'>
    <div class='hands'>
      <h1>手札一覧</h1>
      <br>
      <div v-for='player, id in players'>
        <h2>
          プレイヤーID: {{ player.data.ID }}
          <span v-if='dealer.turnPlayer(players).data.ID === player.data.ID'>[ターンプレイヤー]</span>
        </h2>
        <span v-for='card, handIdx in player.hand.Cards'>
          <span @click='put(id, handIdx)'>[{{ card.toString() }}]</span>
        </span>
        <br>
        <br>
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
      <button @click='step()'>ゲームを進める</button>
    </div>
  </div>
</template>

<script>
import Config from '@/config'
import Constants from '@/constants'
import Dealer from '@/components/Dealer'
import Rule from '@/models/Rule'

export default {
  name: 'Den',
  mixins: [Dealer],
  data() {
    return {
      players: null,
    }
  },
  beforeMount () {
    this.setup()
  },
  methods: {
    setup () {
      this.players = this.god.createPlayers()

      this.dealerShuffleDeck()

      this.dealerDealCardToPlayersAtFirst()

      this.dealerPutCard()
    },
    put (id, handIdx) {
      if (this.dealerCanReceiveCard()) {
        this.dealerReceiveCard()
      } else {
        this.dealerRejectReceivingCard()
      }
    },
    action (id, type, handIdx) {
      switch (type) {
        case Constants.ActionTypeDraw:
          this.dealer.deal(this.players[id])
          if (Rule.isPank(this.players[id].hand)) {
            alert(`プレイヤー${id}の負け`)
            break
          }
          this.dealer.goNextTurn()
          break
        case Constants.ActionTypeForceDraw:
          this.dealer.forceDeal(this.players[id])
          if (Rule.isPank(this.players[id].hand)) {
            alert(`プレイヤー${id}の負け`)
            break
          }
          break
        case Constants.ActionTypePut:
          let card = this.players[id].hand.Cards[handIdx]
          this.players[id].put(handIdx, this.dealer)
          if (this.players[id].hasNoCard()) {
            alert(`プレイヤー${id}の勝ち`)
            break
          }
          this.behave(this.players[id], card)
          this.dealer.goNextTurn()
          break
      }
    },
    behave (player, card) {
      switch (card.Num) {
        case Constants.CardSkillBack:
          this.dealer.reverseTurnTable()
          break
        case Constants.CardSkillSkip:
          this.dealer.goNextTurn()
          break
        case Constants.CardSkillDrawTwo:
          this.dealer.forceDrawAmount += 2
          break
      }
    },
  }
}
</script>
