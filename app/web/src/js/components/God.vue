<script>
import God from '@/models/God'

export default {
  name: 'God',
  data () {
    return {
      god: null,
    }
  },
  created () {
    this.god = new God
  }
}
</script>
