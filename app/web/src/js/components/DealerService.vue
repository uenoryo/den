<script>
import { CardSkillNums } from '../constant/Card'
import { CardMark, Phase } from '../type/Type'
import Rule from '../model/Rule'

export default {
  name: 'Dealer',

  methods: {
    dealerShuffleDeck() {
      this.Dealer.shuffle()
    },

    dealerDealCardToPlayers() {
      for (let player of this.Players.all()) {
        this.Dealer.deal(player)
      }
    },

    dealerDealCardToPlayersAtFirst() {
      for (let i = 0; i < this.Constants.PlayerHandInitAmount; i++) {
        this.dealerDealCardToPlayers()
      }
    },

    dealerPutCard() {
      this.Dealer.put()
      this.Dealer.Field.PutPlayerID = null
    },

    dealerGoNextTurn () {
      this.Dealer.goNextTurn()
    },

    dealerTurnPlayer() {
      return this.Players.get(this.Dealer.TurnPlayerID)
    },

    dealerPlayerIsTurnPlayer (playerID) {
      return this.Dealer.playerIsTurnPlayer(playerID)
    },

    dealerTriggerCardSkillAtFirst() {
      if (this.Dealer.Field.top() === null) {
        return
      }

      switch (this.Dealer.Field.top().Num) {
        case CardSkillNums.Skip:
          this.dealerTriggerCardSkillSkip()
          break

        case CardSkillNums.Reverse:
          this.dealerTriggerCardSkillReverse()
          break

        case CardSkillNums.DrawTwo:
          this.dealerTriggerCardSkillDrawTwo()
          break

        case CardSkillNums.WildCard:
          this.dealerTriggerCardSkillWildCardForceJoker()
          break
      }
    },

    dealerTriggerCardSkillReverse() {
      this.Dealer.reverseTurnTable()
    },

    dealerTriggerCardSkillSkip() {
      this.dealerGoNextTurn()
    },

    dealerTriggerCardSkillDrawTwo() {
      this.Dealer.changePhase(Phase.ForceDraw)
      this.Dealer.increaseForceDrawAmount(2)
    },

    dealerTriggerCardSkillWildCard() {
      this.Dealer.changePhase(Phase.ChangeMark)
    },

    dealerTriggerCardSkillWildCardForceJoker() {
      this.Dealer.Field.top().Mark = CardMark.JokerA
    },

    dealerTriggerCardSkillSkillAttach() {
      this.Dealer.changePhase(Phase.Attach)
    },

    dealerDeal (player) {
      if (! this.dealerCanDeal(player)) {
        return
      }
      // this.animateDeal(this.dealer, player)

      setTimeout(() => {
        if (Rule.isPank(player.Hand)) {
          alert(`[パンク] プレイヤー${player.Data.ID}の負け`)
          this.gameSet()
          return
        }
      }, 1000)
      if (this.Dealer.shouldMaintenance()) {
        this.animateMaintenance(this.Dealer)
      }
    },

    dealerCanPut (card) {
      return Rule.canPut(this.Dealer.Field.top(), card, this.dealerIsForceDrawPhase())
    },

    dealerCanDeal (player) {
      return this.Dealer.playerIsTurnPlayer(player.Data.ID)
        && this.Dealer.phase === Phase.Normal
    },

    dealerListenReply (player, reply, param) {
      if (! this.dealerPlayerIsTurnPlayer(player.Data.ID)) {
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
          this.Dealer.changePhase()
          this.dealerGoNextTurn()
          break
      }
    },

    dealerListenReplyChangeMark (reply) {
      switch (reply) {
        case Constants.PlayerReplyChangeMarkClub:
          this.Dealer.Field.top().Mark = CardMark.Club
          break
        case Constants.PlayerReplyChangeMarkDiamond:
          this.Dealer.Field.top().Mark = CardMark.Diamond
          break
        case Constants.PlayerReplyChangeMarkHeart:
          this.Dealer.Field.top().Mark = CardMark.Heart
          break
        case Constants.PlayerReplyChangeMarkSpade:
          this.Dealer.Field.top().Mark = CardMark.Spade
          break
        case Constants.PlayerReplyChangeMarkJoker:
          this.Dealer.Field.top().Mark = CardMark.JokerA
          break
      }
      this.Dealer.changePhase()
      this.dealerGoNextTurn()
    },

    dealerListenReplyForceDraw (player, reply) {
      switch (reply) {
        case Constants.PlayerReplyForceDrawDraw:
          this.Dealer.changePhase()
          for (let i = 0; i < this.Dealer.forceDrawAmount; i++) {
            this.dealerDeal(player)
          }
          this.Dealer.forceDrawAmount = 0;
          this.dealerGoNextTurn()
          break
      }
    },

    dealerIsAttachPhase() {
      return this.Dealer.phase === Phase.Attach
    },

    dealerIsChangeMarkPhase() {
      return this.Dealer.phase === Phase.ChangeMark
    },

    dealerIsForceDrawPhase() {
      return this.Dealer.phase === Phase.ForceDraw
        && this.Dealer.forceDrawAmount > 0
    },
  }
}
</script>
