<script>
import Constants from '@/constants'

export default {
  name: 'Dealer',
  data () {
    return {
      dealer: null,
      isBusy: false,
    }
  },
  beforeMount () {
    let deck = this.god.createDeck()

    this.dealer = this.god.createDealer(deck)
  },
  methods: {
    dealerShuffleDeck () {
      this.dealer.shuffle()
    },
    dealerDealCardToPlayers () {
      for (let idx in this.players) {
        this.dealer.deal(this.players[idx])
      }
    },
    dealerDealCardToPlayersAtFirst () {
      for (let i = 0; i < Constants.PlayerHandStartAmount; i++) {
        this.dealerDealCardToPlayers()
      }
    },
    dealerPutCard () {
      this.dealer.put()
    },
    dealerCanReceiveCard () {
      return this.isBusy === false
    },
    dealerReceiveCard () {
      alert("Dealer receive card.")
      this.isBusy = true
      setTimeout(() => {
        this.isBusy = false
      }, Constants.DealerReceiveCardIntervalMs)
    },
    dealerRejectReceivingCard () {
      alert("Dealer reject receiving card.")
    }
  }
}
</script>
