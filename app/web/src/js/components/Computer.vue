<script>
import Constants from '@/constants'

export default {
  name: 'Computer',
  methods: {
    computerStandby (putAction, denAction) {
      setInterval(putAction, Constants.ComputerPutActionIntervalMs)
      setInterval(denAction, Constants.ComputerDenActionIntervalMs)
    },
  },
}
</script>
