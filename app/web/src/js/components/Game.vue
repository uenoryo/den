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
      <h1>デッキ</h1>
      <div>残り: {{ dealer.deck.cardNum() }}枚</div>
    </div>
  </div>
</template>

<script>
import God from '@/models/God'
import Constants from '@/constants'

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
  mounted () {
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
    },
    dealCardToPlayers () {
      for (let idx in this.players) {
        this.dealer.deal(this.players[idx])
      }
    },
  }
}
</script>
