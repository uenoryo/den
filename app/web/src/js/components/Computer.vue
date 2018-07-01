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
      if (this.putTimer === undefined) {
        return
      }
      clearInterval(this.putTimer);
      this.computerStartPutTimer(putAction)
    },

    computerResetDenTimer (denAction) {
      if (this.denTimer === undefined) {
        return
      }
      clearInterval(this.denTimer);
      this.computerStartDenTimer(denAction)
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
