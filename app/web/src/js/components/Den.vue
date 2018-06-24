<template>
  <div class='game'>
    <div class='hands'>
      <h1>手札一覧</h1>
      <br>
      <div v-for='player, id in players'>
        <h2>
          プレイヤーID: {{ player.data.ID }}
          <span v-if='dealerPlayerIsTurnPlayer(id)'>[ターンプレイヤー]</span>
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
      if (! this.dealerPlayerIsTurnPlayer(id)) {
        return
      }

      if (this.dealerCanReceiveCard(this.players[id].show(handIdx))) {
        this.dealerReceiveCard(this.players[id].pick(handIdx))

        this.dealerTriggerCardSkill()
      } else {
        this.dealerRejectReceivingCard()
      }
    },
  }
}
</script>
