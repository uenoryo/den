<script>
import { Constants } from '../constant/Basic'

export default {
  name: 'Computer',
  data() {
    return {
      DenTimer: null,
      DutTimer: null,
    }
  },
  methods: {
    computerStandby() {
      this.computerStartPutTimer()
      this.computerStartDenTimer()
    },

    computerResetPutTimer() {
      this.computerStopPutTimer()
      this.computerStartPutTimer()
    },

    computerResetDenTimer() {
      this.computerStopDenTimer()
      this.computerStartDenTimer()
    },

    computerStopPutTimer() {
      if (this.PutTimer === undefined) {
        return
      }
      clearInterval(this.PutTimer);
    },

    computerStopDenTimer() {
      if (this.DenTimer === undefined) {
        return
      }
      clearInterval(this.DenTimer);
    },

    computerStartPutTimer() {
      this.PutTimer = setInterval(this.computerPutAction(), Constants.ComputerPutActionIntervalMs)
    },

    computerStartDenTimer() {
      this.DenTimer = setInterval(this.computerDenAction(), Constants.ComputerDenActionIntervalMs)
    },

    computerLookField(field) {
      for (let player of this.Players.all()) {
        // player.lookField(field)
      }
    },

    computerLookSelfHand() {
      for (let player of this.Players.all()) {
        // player.lookSelfHand()
      }
    },

    computerPutAction() {
      if (!this.dealerTurnPlayer().isComputer()) {
        return
      }

      this.computerLookSelfHand()

      // ForceDraw
      if (this.dealerIsForceDrawPhase()) {
        if (this.dealerTurnPlayer().wantPut(this.Dealer.Field.top(), this.dealerIsForceDrawPhase())) {
          this.put(
            this.dealerTurnPlayer().Data.ID,
            this.dealerTurnPlayer().think(this.dealerIsForceDrawPhase())
          )
        } else {
          this.reply(this.dealerTurnPlayer().Data.ID, Constants.PlayerReplyForceDrawDraw)
        }
        return
      }

      // Attach
      if (this.dealerIsAttachPhase()) {
        if (this.dealerTurnPlayer().wantPut(this.Dealer.Field.top(), this.dealerIsForceDrawPhase())) {
          this.put(
            this.dealerTurnPlayer().Data.ID,
            this.dealerTurnPlayer().think()
          )
        } else {
          this.reply(this.dealerTurnPlayer().Data.ID, Constants.PlayerReplyAttachPass)
        }
        return
      }

      // WildCard
      if (this.dealerIsChangeMarkPhase()) {
        this.reply(this.dealerTurnPlayer().Data.ID, this.dealerTurnPlayer().thinkChangeMark())
        return
      }

      // 通常
      if (this.dealerTurnPlayer().wantPut(this.Dealer.Field.top(), this.dealerIsForceDrawPhase())) {
        this.put(
          this.dealerTurnPlayer().Data.ID,
          this.dealerTurnPlayer().think()
        )
      } else {
        this.draw()
      }
    },

    computerDenAction() {
      for (let player of this.Players.all()) {
        if (player.isHuman() || !player.wantDen()) {
          continue
        }
        this.den(player.Data.ID)
      }
    },
  },
}
</script>
