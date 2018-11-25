<script>
import { Constants } from '../constant/Basic'
import { ReplyAction } from '../type/Type'

export default {
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

      this.computerCloseHand()
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
      if (!this.isGameMain() || !this.turnPlayer().isComputer()) {
        return
      }

      this.computerLookField()

      this.computerLookSelfHand()

      let player = this.turnPlayer()
      let fieldCard = this.Dealer.Field.top()

      switch (true) {
        case this.Dealer.Phase.IsForceDraw:
          if (!player.canPut(fieldCard, true)) {
            this.reply(this.turnPlayerID(), ReplyAction.ForceDraw.Draw)
            return
          }

          let fdAction = player.think(true)
          if (fdAction === -1) {
             this.reply(this.turnPlayerID(), ReplyAction.ForceDraw.Draw)
             return
          }

          this.put(this.turnPlayerID(), fdAction)
          return

        case this.Dealer.Phase.IsAttach:
          if (!player.canPut(fieldCard, false)) {
            this.reply(this.turnPlayerID(), ReplyAction.Attach.Pass)
            return
          }

          let atcAction = player.think(false)
          if (atcAction === -1) {
            this.reply(this.turnPlayerID(), ReplyAction.Attach.Pass)
            return
          }

          this.put(this.turnPlayerID(), atcAction)
          return

        case this.Dealer.Phase.IsChangeMark:
          this.reply(this.turnPlayerID(), player.thinkChangeMark())
          return

        default:
          if (!player.canPut(fieldCard, false)) {
            this.draw()
            return
          }

          let action = player.think(false)
          if (action === -1) {
            this.draw()
            return
          }
          this.put(this.turnPlayerID(), action)
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

    computerCloseHand() {
      for (let player of this.Players.all()) {
        if (player.isHuman() || !player.wantDen()) {
          continue
        }
        player.closeHand()
      }
    },
  },
}
</script>
