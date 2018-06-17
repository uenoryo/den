import assert from 'assert'
import Constants from '../../constants'
import Player from '../../models/Player'
import PlayerData from '../../data/PlayerData'
import Deck from '../../models/Deck'
import DeckData from '../../data/DeckData'
import CardData from '../../data/CardData'

describe('Player', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      assert.equal(p.data.ID, 1)
      assert.equal(p.data.Type, 1)
    })
  })

  describe('.receive()', () => {
    it('カードを手札に加えられる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let card = new CardData(Constants.CardMarkClub, 7)

      p.receive(card)
      assert.equal(p.hand.Cards[0].Mark, Constants.CardMarkClub)
      assert.equal(p.hand.Cards[0].Num, 7)
    })

    it('カード以外は手札に加えることができない', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)

      assert.throws(() => {p.receive('invalid card.')})
    })
  })
})
