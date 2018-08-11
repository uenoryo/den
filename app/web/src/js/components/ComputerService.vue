<script>
import { Constants } from '../constant/Basic'
import { ReplyActionForceDraw, ReplyActionAttach } from '../type/Type'

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
      this.computerLookField()

      this.computerLookSelfHand()

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
      this.PutTimer = setInterval(this.computerPutAction, Constants.ComputerPutActionIntervalMs)
    },

    computerStartDenTimer() {
      this.DenTimer = setInterval(this.computerDenAction, 1000)
    },

    computerLookField() {
      for (let player of this.Players.all()) {
        player.lookField(this.Dealer.Field.top())
      }
    },

    computerLookSelfHand() {
      for (let player of this.Players.all()) {
        player.lookSelfHand()
      }
    },

    computerPutAction() {
      if (!this.turnPlayer().isComputer()) {
        return
      }

      this.computerLookField()

      this.computerLookSelfHand()

      switch (true) {
        case this.Dealer.Phase.IsForceDraw:
          if (this.turnPlayer().wantPut(this.Dealer.Field.top(), true)) {
            this.put(this.turnPlayerID(), this.turnPlayer().think(true))
          } else {
            this.reply(this.turnPlayerID(), ReplyActionForceDraw.Draw)
          }
          return

        case this.Dealer.Phase.IsAttach:
          if (this.turnPlayer().wantPut(this.Dealer.Field.top(), false)) {
            this.put(this.turnPlayerID(), this.turnPlayer().think(false))
          } else {
            this.reply(this.turnPlayerID(), ReplyActionAttach.Pass)
          }
          return

        case this.Dealer.Phase.IsChangeMark:
          this.reply(this.turnPlayerID(), this.turnPlayer().thinkChangeMark())
          return

        default:
          if (this.turnPlayer().wantPut(this.Dealer.Field.top(), false)) {
            this.put(this.turnPlayerID(), this.turnPlayer().think())
          } else {
            this.draw()
          }
          return
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
