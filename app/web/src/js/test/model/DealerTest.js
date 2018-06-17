import assert from 'assert'
import Deck from '../dummy/DummyDeck'
import Dealer from '../../models/Dealer'

describe('Dealer', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      new Dealer(new Deck)
    })

    it('デッキがおかしい場合はエラーになる', () => {
      assert.throws(() => {new Dealer(0)})
    })
  })

  describe('.shuffle()', () => {
    describe('- Deckをシャッフルできる', () => {
      let d = new Dealer(new Deck)

      it('シャッフルしても枚数は変わらない', () => {
        let length = d.deck.data.Cards.length
        d.shuffle()
        assert.equal(d.deck.data.Cards.length, length)
      })
    })
  })
})
