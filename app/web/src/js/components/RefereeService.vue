<script>
import { GameSetType } from '../type/Type'
import { Constants } from '../constant/Basic'

export default {
  data() {
    return {
      denPlayerID: null,
      isWaitingCounteTimer: null,
      isJudgeEnd: false,
    }
  },
  methods: {
    refereeJudgePlainDone(player) {
      if (this.Referee.judgePlainDone(player)) {
        alert(`[素上がり]Player ${player.Data.ID}の勝ち`)
        this.ScoreKeeper.keep(GameSetType.PlainDone, player.Data.ID, 0, this.Players)
        this.ScoreKeeper.save()
        this.gameSet()
      }
    },

    refereeJudgeDen(player) {
      if (this.isJudgeEnd) {
        return null
      }

      let type = null
      if (this.Referee.DenedPlayerID === null) {
        type = this.Referee.judgeDen(player, this.Dealer.Field)
      } else {
        type = this.Referee.judgeCounterDen(player, this.Dealer.Field)
      }

      if (type === null) {
        return
      }

      let isCounter = false
      switch (type) {
        case GameSetType.Den:
          this.ScoreKeeper.keep(GameSetType.Den, player.Data.ID, this.Dealer.Field.PutPlayerID, this.Players)
          break
        case GameSetType.Anko:
          this.ScoreKeeper.keep(GameSetType.Anko, player.Data.ID, this.Dealer.Field.PutPlayerID, this.Players)
          break
        case GameSetType.Chitoi:
          this.ScoreKeeper.keep(GameSetType.Chitoi, player.Data.ID, this.Dealer.Field.PutPlayerID, this.Players)
          break
        case GameSetType.CounterDen:
          isCounter = true
          this.ScoreKeeper.keep(GameSetType.Den, this.Referee.DenedPlayerID, this.denPlayerID, this.Players)
          break
        case GameSetType.CounterAnko:
          isCounter = true
          this.ScoreKeeper.keep(GameSetType.Anko, this.Referee.DenedPlayerID, this.denPlayerID, this.Players)
          break
        case GameSetType.CounterChitoi:
          isCounter = true
          this.ScoreKeeper.keep(GameSetType.Chitoi, this.Referee.DenedPlayerID, this.denPlayerID, this.Players)
          break
      }

      if (isCounter) {
        clearInterval(this.isWaitingCounterTimer)
        this.isJudgeEnd = true
      }

      player.openHand()
      this.computerStopPutTimer()
      this.animationDen(this.Dealer, player)
      this.Referee.DenedPlayerID = this.Dealer.Field.PutPlayerID
      this.denPlayerID = player.Data.ID

      this.isWaitingCounterTimer = setTimeout(() => {
        this.gameSet()
        this.ScoreKeeper.save()
      }, Constants.RefereeWaitCounterTimeMs)
    }
  },
}
</script>
