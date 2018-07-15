<script>
import DeckData from '../data/DeckData'
import CardData from '@/data/CardData'
import Constants from '@/constants'
import Config from '@/config'
import Deck from '@/models/Deck'
import Env from '@/env'

export default {
  methods: {
    debugSetup () {
      this.players = this.god.createPlayers()

      if (Env.DEBUG_DECK_ID === 0) {
        this.dealerShuffleDeck()
      } else {
        this.dealer.deck = this.getDeck(Env.DEBUG_DECK_ID)
      }

      this.dealerDealCardToPlayersAtFirst()

      this.dealerPutCard()
    },
    getDeck (id) {
      let cards = this.debugDeck[id]
      let deck = []
      for (let idx in cards) {
        deck.push(new CardData(cards[idx][0], cards[idx][1]))
      }
      return new Deck(new DeckData(deck))
    },
  },

  data () {
    let c = Constants.CardMarkClub
    let d = Constants.CardMarkDiamond
    let h = Constants.CardMarkHeart
    let s = Constants.CardMarkSpade
    return {
      debugDeck: {
        1: [

        /* Debug Deck: 1 ------------------- */
        /* [P1]     [P2]     [P3]     [P4] */
          [c, 1],  [c, 2],  [c, 3],  [c, 4],
          [c, 5],  [c, 6],  [c, 7],  [c, 8],
          [c, 9],  [c, 10], [c, 11], [c, 12],
          [c, 13], [c, 1],  [c, 2],  [c, 3],
          [c, 4],  [c, 5],  [c, 6],  [c, 7],
          [c, 8],  [c, 9],  [c, 10], [c, 11],
          [c, 12], [c, 13], [c, 1],  [c, 2],
        /* -------------------------------- */

        /* Field Card */
          [c, 3],
        /* ---------- */

          [c, 4],
          [c, 5],
          [c, 6],
          [c, 7],
          [c, 8],
          [c, 9],
          [c, 10],
          [c, 11],
          [c, 12],
          [c, 13],
          [c, 1],
          [c, 2],
          [c, 3],
          [c, 4],
          [c, 5],
          [c, 6],
          [c, 7],
          [c, 8],
          [c, 9],
          [c, 10],
          [c, 11],
          [c, 12],
          [c, 13],

        ],
        2: [

        /* Debug Deck: 1 ------------------- */
        /* [P1]     [P2]     [P3]     [P4] */
          [h, 1],  [h, 2],  [h, 1],  [h, 4],
          [h, 5],  [h, 6],  [h, 7],  [h, 9],
          [h, 9],  [h, 9],  [h, 1],  [h, 2],
          [h, 1],  [h, 1],  [h, 2],  [h, 1],
          [h, 4],  [h, 5],  [h, 6],  [h, 7],
          [h, 5],  [h, 9],  [h, 10], [h, 11],
          [h, 12], [h, 13], [h, 1],  [h, 2],
        /* -------------------------------- */

        /* Field Card */
          [c, 3],
        /* ---------- */

          [h, 4],
          [h, 5],
          [h, 6],
          [h, 7],
          [h, 1],
          [h, 9],
          [h, 10],
          [h, 11],
          [h, 12],
          [h, 13],
          [h, 1],
          [h, 2],
          [h, 5],
          [h, 4],
          [h, 5],
          [h, 6],
          [h, 7],
          [h, 1],
          [h, 9],
          [h, 10],
          [h, 11],
          [h, 12],
          [h, 13],

        ],
        3: [

        /* Debug Deck: 1 ------------------- */
        /* [P1]     [P2]     [P3]     [P4] */
          [h, 8],  [h, 8],  [h, 8],  [h, 8],
          [h, 8],  [h, 8],  [h, 8],  [h, 8],
          [h, 8],  [h, 8],  [h, 8],  [h, 8],
          [h, 8],  [h, 8],  [h, 8],  [h, 8],
          [h, 8],  [h, 8],  [h, 8],  [h, 8],
          [h, 8],  [h, 8],  [h, 8], [h, 8],
          [h, 8], [h, 8], [h, 8],  [h, 8],
        /* -------------------------------- */

        /* Field Card */
          [c, 3],
        /* ---------- */

          [h, 4],
          [h, 5],
          [h, 6],
          [h, 7],
          [h, 1],
          [h, 9],
          [h, 10],
          [h, 11],
          [h, 12],
          [h, 13],
          [h, 1],
          [h, 2],
          [h, 5],
          [h, 4],
          [h, 5],
          [h, 6],
          [h, 7],
          [h, 1],
          [h, 9],
          [h, 10],
          [h, 11],
          [h, 12],
          [h, 13],

        ],
      },
    }
  },
}
</script>
