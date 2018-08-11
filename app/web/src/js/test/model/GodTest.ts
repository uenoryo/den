import * as mocha from "mocha";
import * as assert from 'power-assert';
import { Constants } from '../../constant/Basic'
import { CardJokerNum } from '../../constant/Card'
import { PlayerID, CardMark } from '../../type/Type'
import God from '../../model/God'
import DeckData from '../../data/DeckData'

describe('God', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      new God
    })
  })

  describe('.createDealer()', () => {
    it('Dealerを作成できる', () => {
      let g = new God()
      let deck = new DeckData([])
      let dealer = g.createDealer(deck)
      assert.deepEqual(dealer.Deck, deck)
    })
  })

  describe('.createPlayers()', () => {
    it('Playersを作成できる', () => {
      let g = new God
      let players = g.createPlayers()
      let ids: PlayerID[] = [1, 2, 3, 4]

      for (let id of ids) {
        assert.equal(players.get(id).Data.ID, id)
      }
    })
  })

  describe('.createDeck()', () => {
    describe('- Deckを作成できる', () => {
      let g = new God
      let deck = g.createDeck()

      it(`Cards の長さは${Constants.DeckLength}`, () => {
        assert.equal(deck.Cards.length, Constants.DeckLength)
      })

      it('Cards[0] は Club の A', () => {
        assert.equal(deck.Cards[0].Mark, CardMark.Club)
        assert.equal(deck.Cards[0].Num, 1)
      })

      it('Cards[25] は Diamond の 7', () => {
        assert.equal(deck.Cards[25].Mark, CardMark.Diamond)
        assert.equal(deck.Cards[25].Num, 7)
      })

      it('Cards[53] は Joker B', () => {
        assert.equal(deck.Cards[53].Mark, CardMark.JokerB)
        assert.equal(deck.Cards[53].Num, CardJokerNum)
      })
    })
  })
})
