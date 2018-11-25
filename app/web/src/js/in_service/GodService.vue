<script>
import God from '../model/God'

export default {
  name: 'God',

  methods: {
    godBirth() {
      return new God
    },

    godCreatePlayers(user, is_hard) {
      if (is_hard) {
        return this.God.createPlayers(user.Com1HardLevel, user.Com2HardLevel, user.Com3HardLevel)
      }
      return this.God.createPlayers(user.Com1NormalLevel, user.Com2NormalLevel, user.Com3NormalLevel)
    },

    godCreateDealer() {
      let deck = this.God.createDeck()
      return this.God.createDealer(deck)
    },

    godCreateReferee() {
      return this.God.createReferee()
    },

    godCreateScoreKeeper() {
      let storage = this.God.createStorage()
      return this.God.createScoreKeeper(storage)
    },
  }
}
</script>
