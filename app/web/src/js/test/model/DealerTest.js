import assert from 'assert'
import Deck from '../dummy/DummyDeck'
import Dealer from '../../models/Dealer'

describe('Dealer', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      new Dealer
    })
  })

  describe('.shuffle()', () => {
    describe('- Deckをシャッフルできる', () => {
      let d = new Dealer
      let deck = new Deck

      it('シャッフルしても枚数は変わらない', () => {
        let length = deck.data.Cards.length
        d.shuffle(deck)
        assert.equal(deck.data.Cards.length, length)
      })
    })
  })
})
