<script>
import { Constants } from '../constant/Basic'
import { CardSkillNums } from '../constant/Card'
import { CardMark, Phase, GameSetType, ReplyAction } from '../type/Type'
import Rule from '../model/Rule'

export default {
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

    dealerChangeTurnPlayer() {
      let id = this.ScoreKeeper.LatestWinnerID
      if (id === null || id === 0) {
        id = Constants.InitialStartTurnPlayerID
      }
      this.Dealer.changeTurnPlayer(id)
    },

    dealerPutCard() {
      this.Dealer.put()
      this.Dealer.Field.PutPlayerID = null
    },

    dealerGoNextTurn() {
      this.Dealer.goNextTurn()
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
      this.Dealer.Field.top().changeMark(CardMark.JokerA)
    },

    dealerTriggerCardSkillSkillAttach() {
      this.Dealer.changePhase(Phase.Attach)
    },

    dealerDeal (player) {
      if (!this.dealerCanDeal(player)) {
        return
      }
      this.animationDeal(this.Dealer, player)

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

    dealerResotre() {
      this.Dealer.restore(this.Players)
      this.Dealer.initTurnTable()
      this.Dealer.initPhase()
      this.animationResetAll()
    },

    // Todo: dealer.isBusyをモデルで管理する
    dealerCanReceiveCard(card) {
      if (this.isBusy) {
        return false
      }

      if (this.refereeIsJudging()) {
        return false
      }

      if (! this.dealerCanPut(card)) {
        return false
      }

      return true
    },

    dealerReceiveCard(card, playerID) {
      this.animationReceive(this.Dealer, card, playerID)
      this.isBusy = true
      setTimeout(() => {
        this.isBusy = false
      }, Constants.DealerReceiveCardIntervalMs)
    },

    dealerRejectReceivingCard() {
      console.log("Dealer reject receiving card.")
    },

    dealerTriggerCardSkill() {
      if (this.Dealer.Field.top() === null) {
        return
      }

      // Phase をリセット
      this.Dealer.changePhase(Phase.Normal)

      switch (this.Dealer.Field.top().Num) {
        case CardSkillNums.Reverse:
          this.dealerTriggerCardSkillReverse()
          this.dealerGoNextTurn()
          break

        case CardSkillNums.Skip:
          this.dealerTriggerCardSkillSkip()
          this.dealerGoNextTurn()
          break

        case CardSkillNums.DrawTwo:
          this.dealerTriggerCardSkillDrawTwo()
          this.dealerGoNextTurn()
          break

        case CardSkillNums.WildCard:
          this.dealerTriggerCardSkillWildCard()
          break

        case CardSkillNums.Attach:
          this.dealerTriggerCardSkillSkillAttach()
          break

        default:
          this.dealerGoNextTurn()
      }
    },

    dealerTriggerCardSkillAtFirst() {
      if (this.Dealer.Field.top() === null) {
        return
      }

      switch (this.Dealer.Field.top().Num) {
        case CardSkillNums.Reverse:
          this.dealerTriggerCardSkillReverse()
          break

        case CardSkillNums.Skip:
          this.dealerTriggerCardSkillSkip()
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
      this.Dealer.Field.top().changeMark(CardMark.JokerA)
    },

    dealerTriggerCardSkillSkillAttach() {
      this.Dealer.changePhase(Phase.Attach)
    },

    dealerCanPut(card) {
      return Rule.canPut(this.Dealer.Field.top(), card, this.Dealer.Phase.IsForceDraw)
    },

    dealerCanDeal(player) {
      return this.Dealer.playerIsTurnPlayer(player.Data.ID)
        && this.Dealer.Phase.IsNormal
    },

    dealerListenReply(player, reply, param) {
      if (!this.Dealer.playerIsTurnPlayer(player.Data.ID)) {
        return
      }

      switch (true) {
        case this.Dealer.Phase.IsAttach:
          return this.dealerListenReplyAttach(reply)

        case this.Dealer.Phase.IsChangeMark:
          return this.dealerListenReplyChangeMark(reply)

        case this.Dealer.Phase.IsForceDraw:
          return this.dealerListenReplyForceDraw(player, reply)
      }
    },

    dealerListenReplyAttach(reply) {
      switch (reply) {
        case ReplyAction.Attach.Pass:
          this.Dealer.changePhase(Phase.Normal)
          this.dealerGoNextTurn()
          break
      }
    },

    dealerListenReplyChangeMark (reply) {
      switch (reply) {
        case ReplyAction.ChangeMark.Club:
          this.Dealer.Field.top().changeMark(CardMark.Club)
          break
        case ReplyAction.ChangeMark.Diamond:
          this.Dealer.Field.top().changeMark(CardMark.Diamond)
          break
        case ReplyAction.ChangeMark.Heart:
          this.Dealer.Field.top().changeMark(CardMark.Heart)
          break
        case ReplyAction.ChangeMark.Spade:
          this.Dealer.Field.top().changeMark(CardMark.Spade)
          break
        case ReplyAction.ChangeMark.Joker:
          this.Dealer.Field.top().changeMark(CardMark.JokerA)
          break
      }
      this.Dealer.changePhase(Phase.Normal)
      this.dealerGoNextTurn()
    },

    dealerListenReplyForceDraw (player, reply) {
      switch (reply) {
        case ReplyAction.ForceDraw.Draw:
          this.Dealer.changePhase(Phase.Normal)
          for (let i = 0; i < this.Dealer.ForceDrawAmount; i++) {
            this.dealerDeal(player)
          }
          this.Dealer.resetForceDrawAmount()
          this.dealerGoNextTurn()
          break
      }
    },
  }
}
</script>
