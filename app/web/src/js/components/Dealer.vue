<script>
import Constants from '@/constants'
import Rule from '@/models/Rule'

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
    dealerGoNextTurn () {
      this.dealer.goNextTurn()
    },
    dealerDeal(playerID) {
      this.dealer.deal(this.players[playerID])
      if (Rule.isPank(this.players[playerID].hand)) {
        alert(`[パンク] プレイヤー${playerID}の負け`)
      }
    },
    dealerTurnPlayer() {
      if (this.players[this.dealer.turn] === undefined) {
        return null
      }
      return this.players[this.dealer.turn]
    },
    dealerPlayerIsTurnPlayer(playerID) {
      return this.dealer.playerIsTurnPlayer(playerID)
    },
    // Todo: dealer.isBusyをモデルで管理する
    dealerCanReceiveCard (card) {
      if (this.isBusy) {
        return false
      }

      if (! Rule.canPut(this.dealer.fieldCard(), card)) {
        return false
      }

      return true
    },
    dealerCheckDone (player) {
      if (player.hasNoCard()) {
        alert(`[素上がり]Player ${player.data.ID}の勝ち`)
      }
    },
    dealerJudgeDen (player) {
      if (this.dealerPlayerIsTurnPlayer(player.data.ID)) {
        console.log('miss')
        return
      }
      if (parseInt(this.dealer.fieldCard().Num) === player.handCardNumTotal()) {
        alert('DEN')
        alert(`${player.data.ID}の勝ち`)
      } else {
        console.log('miss')
      }
    },
    dealerReceiveCard (card) {
      this.dealer.receive(card)
      this.isBusy = true
      setTimeout(() => {
        this.isBusy = false
      }, Constants.DealerReceiveCardIntervalMs)
    },
    dealerRejectReceivingCard () {
      alert("Dealer reject receiving card.")
    },
    dealerTriggerCardSkill () {
      if (this.dealer.fieldCard() === null) {
        return
      }
      switch (this.dealer.fieldCard().Num) {
        case Constants.CardSkillBack:
          this.dealer.reverseTurnTable()
          this.dealerGoNextTurn()
          break

        case Constants.CardSkillSkip:
          this.dealerGoNextTurn()
          this.dealerGoNextTurn()
          break

        case Constants.CardSkillDrawTwo:
          this.dealer.increaseForceDrawAmount(2)
          this.dealer.changePhase('ForceDraw')
          this.dealerGoNextTurn()
          break

        case Constants.CardSkillChangeMark:
          this.dealer.changePhase('ChangeMark')

        case Constants.CardSkillAttach:
          this.dealer.changePhase('Attach')
          break

        default:
          this.dealer.changePhase()
          this.dealerGoNextTurn()
          break
      }
    }
  }
}
</script>
