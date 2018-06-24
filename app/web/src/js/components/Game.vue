<template>
  <div class='game'>
    <div class='hands'>
      <h1>手札一覧</h1>
      <br>
      <div v-for='player in players'>
        <h2>
          プレイヤーID: {{ player.data.ID }}
          <span v-if='dealer.turnPlayer(players).data.ID === player.data.ID'>[ターンプレイヤー]</span>
        </h2>
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
import Rule from '@/models/Rule'

export default {
  name: 'Game',
  data() {
    return {
      message: 'Play',
      god: null,
      dealer: null,
      players: null,
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
    },
    dealCardToPlayers () {
      for (let idx in this.players) {
        this.dealer.deal(this.players[idx])
      }
    },
    step () {
      if (this.dealer.turnPlayer(this.players).isComputer()) {
        if (this.dealer.isForceDrawMode()) {
        // DrawTwo
          let handIdx = this.dealer.turnPlayer(this.players).wantForcePut()
          if (handIdx === false) {
            let drawCount = this.dealer.forceDrawAmount
            for (let i = 0; i < drawCount; i++) {
              this.action(this.dealer.turn, Constants.ActionTypeForceDraw)
            }
            this.dealer.goNextTurn()
          } else {
            this.action(this.dealer.turn, Constants.ActionTypePut, handIdx)
          }
        } else if (this.dealer.turnPlayer(this.players).wantPut(this.dealer.fieldCard())) {
        // WantPut
          let handIdx = this.dealer.turnPlayer(this.players).think(this.dealer.fieldCard())
          this.action(this.dealer.turn, Constants.ActionTypePut, handIdx)
        } else {
        // WantDraw
          let action = this.dealer.turnPlayer(this.players).noPutAction()
          this.action(this.dealer.turn, action)
        }
      }

      if (this.dealer.shouldMaintenance()) {
        this.dealer.maintenance()
        this.dealer.shuffle()
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
