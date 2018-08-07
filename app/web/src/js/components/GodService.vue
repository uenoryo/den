<script>
import God from '../model/God'

export default {
  name: 'God',

  methods: {
    godBirth() {
      return new God
    },
    godCreatePlayers() {
      return this.God.createPlayers()
    },
    godCreateDealer() {
      let deck = this.God.createDeck()
      return this.God.createDealer(deck)
    }
  }
}
</script>
