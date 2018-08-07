<script>
import God from '../model/God'

export default {
  name: 'God',

  methods: {
    godBirth() {
      return new God
    },
    godCreatePlayers() {
      return this.god.createPlayers()
    },
    godCreateDealer() {
      let deck = this.god.createDeck()
      return this.god.createDealer(deck)
    }
  }
}
</script>
