<script>
import Env from '../env'
import RequestStatus from '../model/RequestStatus'
import { RequestStatusType } from '../type/Type'
import { Prefecture } from '../data/PrefectureData'

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
        this.MSBusinessByID[row.id].prefecture = Prefecture[row.prefecture]
      }
    },
  },
}
</script>
