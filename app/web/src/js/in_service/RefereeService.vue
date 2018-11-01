<script>
import { GameSetType } from '../type/Type'
import { Constants } from '../constant/Basic'

export default {
  data() {
    return {
      isWaitingFinishTimer: null,
    }
  },
  methods: {
    refereeJudgePlainDone(player) {
      if (!this.Referee.judgePlainDone(player)) {
        return
      }

      this.ScoreKeeper.keep(GameSetType.PlainDone, player.Data.ID, 0, this.Players, this.Level)
      this.refereeWaitFinish()
    },

    refereeJudgePank(player) {
      console.log(player.Hand.Cards.length)
      if (!this.Referee.judgePank(player)) {
        return
      }

      this.ScoreKeeper.keep(GameSetType.Pank, 0, player.Data.ID, this.Players, this.Level)
      this.animationPank(player)
      this.refereeWaitFinish()
    },

    refereeJudgeDen(player) {
      let type = null
      if (this.Referee.DenLaunchPlayerID === null) {
        type = this.Referee.judgeDen(player, this.Dealer.Field)
      } else {
        type = this.Referee.judgeCounterDen(player, this.Dealer.Field)
      }
      if (type === null) {
        return
      }

      let field = this.Dealer.Field.top()
      switch (type) {
        case GameSetType.Den:
          this.ScoreKeeper.keep(GameSetType.Den, player.Data.ID, this.Dealer.Field.PutPlayerID, this.Players, field, this.Level)
          this.refereeDenAction(player)
          this.refereeWaitFinish()
          break
        case GameSetType.Anko:
          this.ScoreKeeper.keep(GameSetType.Anko, player.Data.ID, this.Dealer.Field.PutPlayerID, this.Players, field, this.Level)
          this.refereeDenAction(player)
          this.refereeWaitFinish()
          break
        case GameSetType.Chitoi:
          this.ScoreKeeper.keep(GameSetType.Chitoi, player.Data.ID, this.Dealer.Field.PutPlayerID, this.Players, field, this.Level)
          this.refereeDenAction(player)
          this.refereeWaitFinish()
          break
        case GameSetType.CounterDen:
          this.ScoreKeeper.keep(GameSetType.CounterDen, player.Data.ID, this.Referee.DenLaunchPlayerID, this.Players, field, this.Level)
          this.refereeDenAction(player)
          this.refereeWaitFinish()
          break
        case GameSetType.CounterAnko:
          this.ScoreKeeper.keep(GameSetType.CounterAnko, player.Data.ID, this.Referee.DenLaunchPlayerID, this.Players, field, this.Level)
          this.refereeDenAction(player)
          this.refereeWaitFinish()
          break
        case GameSetType.CounterChitoi:
          this.ScoreKeeper.keep(GameSetType.CounterChitoi, player.Data.ID, this.Referee.DenLaunchPlayerID, this.Players, field, this.Level)
          this.refereeDenAction(player)
          this.refereeWaitFinish()
          break
      }
    },

    refereeIsJudging() {
      return this.isWaitingFinishTimer !== null
    },

    refereeDenAction(player) {
      player.openHand()
      this.computerStopPutTimer()
      this.animationDen(this.Dealer, player)
      this.Referee.DenLaunchPlayerID = player.Data.ID
    },

    refereeWaitFinish() {
      clearInterval(this.isWaitingFinishTimer)
      this.isWaitingFinishTimer = setTimeout(() => {
        this.refereeFinish()
      }, Constants.RefereeWaitFinishTimeMs)
    },

    refereeFinish() {
      this.ScoreKeeper.save()
      this.gameSet()
      this.Referee.DenLaunchPlayerID = null
      this.isWaitingFinishTimer = null
    },
  },
}
</script>
