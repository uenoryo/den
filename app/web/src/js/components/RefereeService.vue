<script>
import { GameSetType } from '../type/Type'

export default {
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
      let type = this.Referee.judgeDen(player, this.Dealer.Field)
      if (type === null) {
        return
      }
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
      }
      this.animationDen(this.Dealer, player)
      player.openHand()
      this.gameSet()

      this.ScoreKeeper.save()
    }
  },
}
</script>
