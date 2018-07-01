<script>
import Constants from '@/constants'

export default {
  name: 'Computer',
  data() {
    return {
      denTimer: null,
      putTimer: null,
    }
  },
  methods: {
    computerStandby (putAction, denAction) {
      this.computerStartPutTimer(putAction)
      this.computerStartDenTimer(denAction)
    },

    computerResetPutTimer (putAction) {
      this.computerStopPutTimer()
      this.computerStartPutTimer(putAction)
    },

    computerResetDenTimer (denAction) {
      this.computerStopDenTimer()
      this.computerStartDenTimer(denAction)
    },

    computerStopPutTimer () {
      if (this.putTimer === undefined) {
        return
      }
      clearInterval(this.putTimer);
    },

    computerStopDenTimer () {
      if (this.denTimer === undefined) {
        return
      }
      clearInterval(this.denTimer);
    },

    computerStartPutTimer (putAction) {
      this.putTimer = setInterval(putAction, Constants.ComputerPutActionIntervalMs)
    },

    computerStartDenTimer (denAction) {
      this.denTimer = setInterval(denAction, Constants.ComputerDenActionIntervalMs)
    },
  },
}
</script>
