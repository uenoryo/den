import assert from 'assert'
import Constants from '../../constants'
import Deck from '../dummy/DummyDeck'
import God from '../../models/God'

describe('God', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      new God
    })
  })

  describe('.createDealer()', () => {
    it('Dealerを作成できる', () => {
      let g = new God()
      let dealer = g.createDealer(new Deck)

      assert.equal(dealer.constructor.name, 'Dealer')
    })

    it('デッキを渡さないとエラーになる', () => {
      let g = new God()
      assert.throws(() => {g.createDealer(0)})
    })
  })

  describe('.createPlayers()', () => {
    it('Playerを作成できる', () => {
      let g = new God
      let playerByID = g.createPlayers()

      for (let id in playerByID) {
        assert.equal(playerByID[id].constructor.name, 'Player')
        assert.equal(id, playerByID[id].data.ID)
      }
    })
  })

  describe('.createDeck()', () => {
    describe('- Deckを作成できる', () => {
      let g = new God
      let deck = g.createDeck()

      it(`Cards の長さは${Constants.DeckLength}`, () => {
        assert.equal(deck.data.Cards.length, Constants.DeckLength)
      })

      it('Cards[0] は Club の A', () => {
        assert.equal(deck.data.Cards[0].Mark, Constants.CardMarkClub)
        assert.equal(deck.data.Cards[0].Num, 1)
      })

      it('Cards[25] は Diamond の 7', () => {
        assert.equal(deck.data.Cards[25].Mark, Constants.CardMarkDiamond)
        assert.equal(deck.data.Cards[25].Num, 7)
      })

      it('Cards[53] は Joker', () => {
        assert.equal(deck.data.Cards[53].Mark, Constants.CardMarkJoker)
        assert.equal(deck.data.Cards[53].Num, Constants.CardJokerNum)
      })
    })
  })
})
