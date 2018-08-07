<script>
import { CardSkillNums } from '../constant/Card'

export default {
  name: 'Dealer',

  methods: {
    dealerShuffleDeck() {
      this.Dealer.shuffle()
    },

    dealerDealCardToPlayers () {
      for (let id in this.players) {
        this.Dealer.deal(this.players[id])
      }
    },

    dealerDealCardToPlayersAtFirst () {
      for (let i = 0; i < this.Constants.PlayerHandInitAmount; i++) {
        this.dealerDealCardToPlayers()
      }
    },

    dealerPutCard () {
      this.Dealer.put()
      this.Dealer.Field.PutPlayerID = null
    },

    dealerTriggerCardSkillAtFirst () {
      if (this.Dealer.Field.top() === null) {
        return
      }

      switch (this.Dealer.Field.top().Num) {
        case CardSkillNums.Skip:
          this.dealerTriggerCardSkillSkip()
          break

        case CardSkillNums.Reverse:
          this.dealerTriggerCardSkillReverse()
          break

        case CardSkillNums.DrawTwo:
          this.dealerTriggerCardSkillDrawTwo()
          break

        case CardSkillNums.WildCard:
          this.dealerTriggerCardSkillWildCardForceJoker()
          break
      }
    },
  }
}
</script>
