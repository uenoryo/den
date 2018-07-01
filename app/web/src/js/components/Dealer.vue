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
    dealerDeal(player) {
      if (! this.dealerCanDeal(player)) {
        return
      }
      this.dealer.deal(player)
      if (Rule.isPank(player.hand)) {
        alert(`[パンク] プレイヤー${player.data.ID}の負け`)
      }
    },
    dealerCanPut(card) {
      return Rule.canPut(this.dealer.fieldCard(), card, this.dealerIsForceDrawPhase())
    },
    dealerCanDeal(player) {
      return this.dealer.playerIsTurnPlayer(player.data.ID)
        && this.dealer.phase === Constants.DealerPhaseNormal
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

      if (! this.dealerCanPut(card)) {
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
        return
      }
      if (parseInt(this.dealer.fieldCard().Num) === player.handCardNumTotal()) {
        alert('DEN')
        alert(`${player.data.ID}の勝ち`)
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
          this.dealer.changePhase()
          this.dealer.reverseTurnTable()
          this.dealerGoNextTurn()
          break

        case Constants.CardSkillSkip:
          this.dealer.changePhase()
          this.dealerGoNextTurn()
          this.dealerGoNextTurn()
          break

        case Constants.CardSkillDrawTwo:
          this.dealer.changePhase(Constants.DealerPhaseForceDraw)
          this.dealer.increaseForceDrawAmount(2)
          this.dealerGoNextTurn()
          break

        case Constants.CardSkillWildCard:
          this.dealer.changePhase(Constants.DealerPhaseChangeMark)
          break

        case Constants.CardSkillAttach:
          this.dealer.changePhase(Constants.DealerPhaseAttach)
          break

        default:
          this.dealer.changePhase()
          this.dealerGoNextTurn()
          break
      }
    },
    dealerListenReply (player, reply, param) {
      if (! this.dealerPlayerIsTurnPlayer(player.data.ID)) {
        return
      }
      if (this.dealerIsAttachPhase()) {
        this.dealerListenReplyAttach(reply)
      }
      if (this.dealerIsChangeMarkPhase()) {
        this.dealerListenReplyChangeMark(reply)
      }
      if (this.dealerIsForceDrawPhase()) {
        this.dealerListenReplyForceDraw(player, reply)
      }
    },
    dealerListenReplyAttach (reply) {
      switch (reply) {
        case Constants.PlayerReplyAttachPass:
          this.dealer.changePhase()
          this.dealerGoNextTurn()
          break
      }
    },
    dealerListenReplyChangeMark (reply) {
      switch (reply) {
        case Constants.PlayerReplyChangeMarkClub:
          this.dealer.fieldCard().Mark = Constants.CardMarkClub
          this.dealer.changePhase()
          this.dealerGoNextTurn()
          break
        case Constants.PlayerReplyChangeMarkDiamond:
          this.dealer.fieldCard().Mark = Constants.CardMarkDiamond
          this.dealer.changePhase()
          this.dealerGoNextTurn()
          break
        case Constants.PlayerReplyChangeMarkHeart:
          this.dealer.fieldCard().Mark = Constants.CardMarkHeart
          this.dealer.changePhase()
          this.dealerGoNextTurn()
          break
        case Constants.PlayerReplyChangeMarkSpade:
          this.dealer.fieldCard().Mark = Constants.CardMarkSpade
          this.dealer.changePhase()
          this.dealerGoNextTurn()
          break
        case Constants.PlayerReplyChangeMarkJoker:
          this.dealer.fieldCard().Mark = Constants.CardMarkJokerA
          this.dealer.changePhase()
          this.dealerGoNextTurn()
          break
      }
    },
    dealerListenReplyForceDraw (player, reply) {
      switch (reply) {
        case Constants.PlayerReplyForceDrawDraw:
          this.dealer.changePhase()
          for (let i = 0; i < this.dealer.forceDrawAmount; i++) {
            this.dealerDeal(player)
          }
          this.dealer.forceDrawAmount = 0;
          this.dealerGoNextTurn()
          break
      }
    },
    dealerIsAttachPhase () {
      return this.dealer.phase === Constants.DealerPhaseAttach
    },
    dealerIsChangeMarkPhase () {
      return this.dealer.phase === Constants.DealerPhaseChangeMark
    },
    dealerIsForceDrawPhase () {
      return this.dealer.phase === Constants.DealerPhaseForceDraw
        && this.dealer.forceDrawAmount > 0
    },
  }
}
</script>
