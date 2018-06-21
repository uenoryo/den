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
    it('手札をスコア順に並び替えられる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)

      p.receive(new CardData(Constants.CardMarkSpade, Constants.CardJokerNum))
      p.receive(new CardData(Constants.CardMarkClub, 12))
      p.receive(new CardData(Constants.CardMarkDiamond, 1))
      p.receive(new CardData(Constants.CardMarkHeart, 5))
      p.receive(new CardData(Constants.CardMarkClub, 8))
      p.receive(new CardData(Constants.CardMarkSpade, 11))

      p.sort()

      assert.equal(p.pick(0).Num, 12)
      assert.equal(p.pick(0).Num, 11)
      assert.equal(p.pick(0).Num, 8)
      assert.equal(p.pick(0).Num, 5)
      assert.equal(p.pick(0).Num, 1)
      assert.equal(p.pick(0).Num, Constants.CardJokerNum)
    })
  })

  describe('.wantPut()', () => {
    it('出したいカードがある')
    it('出したいカードがない')
  })

  describe('.think()', () => {
    it('数字の大きいカードは優先的に処理する')
  })

  describe('.hasNoCard()', () => {
    describe('手札が無いかどうかを返すことができる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      it('手札が無い場合はTrueを返す', () => {
        assert.equal(p.hasNoCard(), true)
      })

      it('手札がある場合はFalseを返す', () => {
        p.receive(new CardData(Constants.CardMarkDiamond, 8))
        assert.equal(p.hasNoCard(), false)
      })
    })
  })

  describe('.isHuman()', () => {
    describe('プレイヤータイプが人間かどうかを返すことができる', () => {
      it('人間である場合はTrueを返す', () => {
        let pd = new PlayerData(1, Constants.PlayerTypeHuman)
        let p = new Player(pd)
        assert.equal(p.isHuman(), true)
      })

      it('人間ではない場合はFalseを返す', () => {
        let pd = new PlayerData(1, Constants.PlayerTypeComputer)
        let p = new Player(pd)
        assert.equal(p.isHuman(), false)
      })
    })
  })

  describe('.isComputer()', () => {
    it('プレイヤータイプがコンピューターかどうかを返すことができる')
  })
})
