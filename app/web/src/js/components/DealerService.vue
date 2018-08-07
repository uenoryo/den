<script>

export default {
  name: 'Dealer',

  methods: {
    dealerShuffleDeck() {
      this.dealer.shuffle()
    },

    dealerDealCardToPlayers () {
      for (let id in this.players) {
        this.dealer.deal(this.players[id])
      }
    },

    dealerDealCardToPlayersAtFirst () {
      for (let i = 0; i < this.constants.PlayerHandInitAmount; i++) {
        this.dealerDealCardToPlayers()
      }
    },
  }
}
</script>
