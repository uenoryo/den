<template>
  <div class='game'>
    <div class='hands'>
      <h1>手札一覧</h1>
      <br>
      <div v-for='player in players'>
        <h2>プレイヤーID: {{ player.data.ID }}</h2>
        <span v-for='card in player.hand.Cards'>
          [{{ card.toString() }}]
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
import God from '@/models/God'
import Config from '@/config'
import Constants from '@/constants'

export default {
  name: 'Game',
  data() {
    return {
      message: 'Play',
      god: null,
      dealer: null,
      players: null,
      turn: null,
    }
  },
  beforeMount () {
    this.god = new God
    this.setup()
  },
  methods: {
    setup () {
      let deck = this.god.createDeck()
      // Create dealer
      this.dealer = this.god.createDealer(deck)

      // Create entry player
      this.players = this.god.createPlayers()

      this.dealer.shuffle()

      // Deal cards to players
      for (let i = 0; i < Constants.PlayerHandStartAmount; i++) {
        this.dealCardToPlayers()
      }

      // Put card
      this.dealer.put()

      this.turn = Constants.Player1ID
    },
    dealCardToPlayers () {
      for (let idx in this.players) {
        this.dealer.deal(this.players[idx])
      }
    },
    step () {
      if (this.players[this.turn].data.Type === Constants.PlayerTypeComputer) {
        if (this.players[this.turn].wantPut(this.dealer.fieldCard())) {
          let handIdx = this.players[this.turn].think(this.dealer.fieldCard())
          this.action(this.turn, Constants.ActionTypePut, handIdx)
        } else {
          let action = this.players[this.turn].noPutAction()
          this.action(this.turn, action)
        }
      }
    },
    action (id, type, handIdx) {
      switch (type) {
        case Constants.ActionTypeDraw:
          this.dealer.deal(this.players[id])
          this.next()
          break
        case Constants.ActionTypePut:
          this.players[id].put(handIdx, this.dealer)
          if (this.players[id].hand.Cards.length === 0) {
            alert(`プレイヤー${id}の勝ち`)
          }
          this.next()
          break
      }
    },
    next () {
      let turnIdx = Config.Turn.indexOf(this.turn)
      if (turnIdx >= Config.Turn.length-1) {
        turnIdx = 0
      } else {
        turnIdx++
      }
      this.turn = Config.Turn[turnIdx]
    }
  }
}
</script>
