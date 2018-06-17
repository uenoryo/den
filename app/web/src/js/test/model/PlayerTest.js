import assert from 'assert'
import Constants from '../../constants'
import Player from '../../models/Player'
import PlayerData from '../../data/PlayerData'
import Deck from '../../models/Deck'
import DeckData from '../../data/DeckData'
import CardData from '../../data/CardData'
import HandData from '../../data/CardData'
import Dealer from '../../models/Dealer'

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

  describe('.pick()', () => {
    it('カードを手札から１枚抜き取ることができる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let card = new CardData(Constants.CardMarkSpade, 4)

      p.receive(card)
      let picked = p.pick(0)

      assert.equal(picked.Mark, Constants.CardMarkSpade)
      assert.equal(picked.Num, 4)
    })

    it('抜き取ろうとする位置にカードがなければエラー', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let card = new CardData(Constants.CardMarkSpade, 4)

      p.receive(card)
      assert.throws(() => {p.pick(1)})
    })
  })

  describe('.put()', () => {
    it('カードをディーラーに渡すことができる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let deck = new Deck(new DeckData([]))
      let dealer = new Dealer(deck)
      let card = new CardData(Constants.CardMarkDiamond, 11)
      p.receive(card)

      p.put(0, dealer)

      assert.equal(dealer.field.Cards[0].Mark, Constants.CardMarkDiamond)
      assert.equal(dealer.field.Cards[0].Num, 11)
    })

    it('抜き取ろうとする位置にカードがなければエラーになる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let deck = new Deck(new DeckData([]))
      let dealer = new Dealer(deck)
      let card = new CardData(Constants.CardMarkDiamond, 11)
      p.receive(card)

      assert.throws(() => {p.put(1, dealer)})
    })

    it('ディーラーがおかしければエラーになる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let card = new CardData(Constants.CardMarkDiamond, 11)
      p.receive(card)

      assert.throws(() => {p.put(0, 'invalid dealer')})
    })
  })

  describe('.sort()', () => {
    it('手札をスコア順に並び替えられる')
  })

  describe('.wantPut()', () => {
    it('出したいカードがある')
    it('出したいカードがない')
  })

  describe('.think()', () => {
    it('数字の大きいカードは優先的に処理する')
  })
})
