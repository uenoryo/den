<script>
import Env from '../env'
import RequestStatus from '../model/RequestStatus'
import { RequestStatusType } from '../type/Type'
import { Prefecture } from '../data/PrefectureData'

export default {
  data() {
    return {
      MSBusinessByID: null,
      MSUserRankByRank: null,
    }
  },

  methods: {
    masterdataClean() {
      this.MSBusinessByID = []
      for (let row of this.Businesses) {
        this.MSBusinessByID[row.id] = row
        this.MSBusinessByID[row.id].prefecture = Prefecture[row.prefecture]
      }

      this.MSUserRankByRank = []
      for (let row of this.UserRanks) {
        this.MSUserRankByRank[row.rank] = row
      }

      console.log(this.MSUserRankByRank)
    },
  },
}
</script>
