<script>
import { GameSetType } from '../type/Type'
import { Constants } from '../constant/Basic'

export default {
  data() {
    return {
      isWaitingCounterTimer: null,
    }
  },
  methods: {
    refereeJudgePlainDone(player) {
      if (!this.Referee.judgePlainDone(player)) {
        return
      }

      this.ScoreKeeper.keep(GameSetType.PlainDone, player.Data.ID, 0, this.Players)
      this.refereeWaitFinish()
    },

    refereeJudgeDen(player) {
      let type = null
      if (this.Referee.DenedPlayerID === null) {
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
          this.ScoreKeeper.keep(GameSetType.Den, player.Data.ID, this.Dealer.Field.PutPlayerID, this.Players, field)
          this.refereeDenAction(player)
          this.refereeWaitFinish()
          break
        case GameSetType.Anko:
          this.ScoreKeeper.keep(GameSetType.Anko, player.Data.ID, this.Dealer.Field.PutPlayerID, this.Players, field)
          this.refereeDenAction(player)
          this.refereeWaitFinish()
          break
        case GameSetType.Chitoi:
          this.ScoreKeeper.keep(GameSetType.Chitoi, player.Data.ID, this.Dealer.Field.PutPlayerID, this.Players, field)
          this.refereeDenAction(player)
          this.refereeWaitFinish()
          break
        case GameSetType.CounterDen:
          this.ScoreKeeper.keep(GameSetType.CounterDen, player.Data.ID, this.Referee.DenedPlayerID, this.Players, field)
          this.refereeDenAction(player)
          this.refereeWaitFinish()
          break
        case GameSetType.CounterAnko:
          this.ScoreKeeper.keep(GameSetType.CounterAnko, player.Data.ID, this.Referee.DenedPlayerID, this.Players, field)
          this.refereeDenAction(player)
          this.refereeWaitFinish()
          break
        case GameSetType.CounterChitoi:
          this.ScoreKeeper.keep(GameSetType.CounterChitoi, player.Data.ID, this.Referee.DenedPlayerID, this.Players, field)
          this.refereeDenAction(player)
          this.refereeWaitFinish()
          break
      }
    },

    refereeIsJudging() {
      return this.isWaitingCounterTimer !== null
    },

    refereeDenAction(player) {
      player.openHand()
      this.computerStopPutTimer()
      this.animationDen(this.Dealer, player)
      this.Referee.DenedPlayerID = player.Data.ID
    },

    refereeWaitFinish() {
      clearInterval(this.isWaitingCounterTimer)
      this.isWaitingCounterTimer = setTimeout(() => {
        this.refereeFinish()
      }, Constants.RefereeWaitCounterTimeMs)
    },

    refereeFinish() {
      this.ScoreKeeper.save()
      this.gameSet()
      this.Referee.DenedPlayerID = null
      this.isWaitingCounterTimer = null
    },
  },
}
</script>
