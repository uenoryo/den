<script>
import { Constants } from '../constant/Basic'
import { CardSkillNums } from '../constant/Card'
import { CardMark, Phase, GameSetType, ReplyAction } from '../type/Type'
import Rule from '../model/Rule'

export default {
  methods: {
    dealerSetup() {
      this.Dealer.restore(this.Players)
      this.Dealer.initTurnTable()
      this.Dealer.initPhase()
      this.isBusy = false
      this.Dealer.forceDrawAmount = 0
      this.animationResetAll()
    },

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

      let dealFunc = () => {
        this.dealerChangePhaseToNormal()
        this.animationDeal(this.Dealer, player)
      }

      // メンテナンスが必要な場合はdealを遅延して行う
      if (this.Dealer.shouldMaintenance()) {
        this.Dealer.changePhase(Phase.Maintenance)
        this.animateMaintenance(this.Dealer, dealFunc)
      } else {
        dealFunc()
      }
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

      if (this.refereeIsJudging()) {
        return
      }

      // Phase をリセット
      this.dealerChangePhaseToNormal()

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
        && !this.refereeIsJudging()
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
          this.dealerChangePhaseToNormal()
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
      this.dealerChangePhaseToNormal()
      this.dealerGoNextTurn()
    },

    dealerListenReplyForceDraw (player, reply) {
      switch (reply) {
        case ReplyAction.ForceDraw.Draw:
          let forceDrawFunc = () => {
            this.dealerChangePhaseToNormal()
            for (let i = 0; i < this.Dealer.ForceDrawAmount; i++) {
              this.dealerDeal(player)
            }
            this.Dealer.resetForceDrawAmount()
            this.dealerGoNextTurn()
          }

          // 枚数が足りない場合は先にメンテナンスを行って遅延実行
          if (this.Dealer.Deck.CardAmount < this.Dealer.ForceDrawAmount + Constants.DeckMaintenanceRemainingAmount) {
            this.Dealer.changePhase(Phase.Maintenance)
            this.animateMaintenance(this.Dealer, forceDrawFunc)
          } else {
            forceDrawFunc()
          }
          break
      }
    },

    dealerChangePhaseToNormal() {
      this.Dealer.changePhase(Phase.Normal)
    },
  }
}
</script>
