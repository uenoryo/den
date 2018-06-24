<script>
import Constants from '@/constants'

export default {
  name: 'Computer',
  methods: {
    computerStandby (putAction, denAction) {
      for (let id in this.players) {
        if (this.players[id].isComputer()) {
          setInterval(putAction, Constants.ComputerPutActionIntervalMs)
          setInterval(denAction, Constants.ComputerDenActionIntervalMs)
          break
        }
      }
    },
  },
}
</script>
