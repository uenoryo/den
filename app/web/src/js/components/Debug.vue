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

        /* Debug Deck: 2 [引くしかできない] --- */
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

        /* Debug Deck: 3 [All 8] ---------- */
        /* [P1]     [P2]     [P3]     [P4] */
          [h, 8],  [h, 8],  [h, 8],  [h, 8],
          [h, 8],  [h, 8],  [h, 8],  [h, 8],
          [h, 8],  [h, 8],  [h, 8],  [h, 8],
          [h, 8],  [h, 8],  [h, 8],  [h, 8],
          [h, 8],  [h, 8],  [h, 8],  [h, 8],
          [h, 8],  [h, 8],  [h, 8],  [h, 8],
          [h, 8],  [h, 8],  [h, 8],  [h, 8],
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
        4: [

        /* Debug Deck: 4 [Den できる] ------- */
        /* [P1]     [P2]     [P3]     [P4] */
          [c, 1],  [c, 7],  [h, 13],  [h, 11],
          [d, 1],  [d, 7],  [d, 13],  [d, 11],
          [h, 1],  [h, 7],  [c, 13],  [c, 10],
          [s, 1],  [s, 7],  [s, 13],  [s, 10],
          [c, 2],  [c, 6],  [s, 11], [h, 11],
          [d, 3],  [d, 6],  [c, 12], [c, 9],
          [h, 4],  [h, 6],  [h, 4],  [s, 9],
        /* -------------------------------- */

        /* Field Card */
          [c, 1],
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
        5: [

        /* Debug Deck: 5 [暗刻できる] ------- */
        /* [P1]     [P2]     [P3]     [P4] */
          [c, 11], [s, 13], [s, 11],  [h, 12],
          [d, 11], [d, 7],  [d, 10],  [d, 12],
          [h, 11], [h, 7],  [h, 10],  [c, 10],
          [h, 1],  [s, 7],  [s, 8],   [s, 10],
          [c, 2],  [c, 6],  [s, 6],   [c, 1],
          [d, 3],  [d, 4],  [c, 12],  [c, 9],
          [h, 4],  [h, 6],  [h, 4],   [s, 9],
        /* -------------------------------- */

        /* Field Card */
          [s, 1],
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
        6: [

        /* Debug Deck: 6 [チートイできる] ------- */
        /* [P1]     [P2]     [P3]     [P4] */
          [c, 11], [s, 11], [s, 13],  [d, 12],
          [d, 11], [d, 7],  [d, 10],  [s, 12],
          [h, 12], [h, 7],  [h, 10],  [c, 10],
          [c, 12], [s, 7],  [s, 8],   [s, 10],
          [c, 2],  [c, 6],  [s, 6],   [c, 1],
          [s, 2],  [d, 4],  [c, 3],   [c, 9],
          [h, 13], [h, 6],  [h, 4],   [s, 9],
        /* -------------------------------- */

        /* Field Card */
          [s, 1],
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
