<script>
import Env from '../env'
import RequestStatus from '../model/RequestStatus'
import { RequestStatusType } from '../type/Type'

export default {
  data() {
    return {
      MSBusinessByID: null,
    }
  },

  methods: {
    masterdataClean() {
      this.MSBusinessByID = []
      for (let row of this.Businesses) {
        this.MSBusinessByID[row.id] = row
      }
    },
  },
}
</script>
