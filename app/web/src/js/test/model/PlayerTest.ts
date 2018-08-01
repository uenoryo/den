import * as mocha from "mocha";
import * as assert from 'power-assert';
import { PlayerType } from '../../type/Type'
import CardData from '../../data/CardData'
import DeckData from '../../data/DeckData'
import PlayerData from '../../data/PlayerData'
import Dealer from '../../model/Dealer'
import Player from '../../model/Player'

describe('Player', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      assert.equal(p.Data.ID, 1)
      assert.equal(p.Data.Type, 1)
    })
  })

  describe('.receive()', () => {
    it('カードを手札に加えられる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let card = new CardData(1, 7)

      p.receive(card)
      assert.equal(p.Hand.Cards[0].Mark, 1)
      assert.equal(p.Hand.Cards[0].Num, 7)
    })
  })

  describe('.pick()', () => {
    it('カードを手札から１枚抜き取ることができる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let card = new CardData(2, 4)

      p.receive(card)
      let picked = p.pick(0)

      assert.equal(picked.Mark, 2)
      assert.equal(picked.Num, 4)
    })

    it('抜き取ろうとする位置にカードがなければエラー', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let card = new CardData(2, 4)

      p.receive(card)
      assert.throws(() => {p.pick(1)})
    })
  })

  describe('.put()', () => {
    it('カードをディーラーに渡すことができる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let dealer = new Dealer(new DeckData([]))
      let card = new CardData(0, 11)
      p.receive(card)

      p.put(0, dealer)

      assert.equal(dealer.Field.Cards[0].Mark, 0)
      assert.equal(dealer.Field.Cards[0].Num, 11)
    })
  })

  describe('.sort()', () => {
    it('手札をスコア順に並び替えられる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)

      p.receive(new CardData(3, 0))
      p.receive(new CardData(0, 12))
      p.receive(new CardData(1, 1))
      p.receive(new CardData(2, 5))
      p.receive(new CardData(0, 8))
      p.receive(new CardData(3, 11))

      p.sort()

      assert.equal(p.pick(0).Num, 12)
      assert.equal(p.pick(0).Num, 11)
      assert.equal(p.pick(0).Num, 8)
      assert.equal(p.pick(0).Num, 5)
      assert.equal(p.pick(0).Num, 1)
      assert.equal(p.pick(0).Num, 0)
    })
  })

  describe ('.canPut()', () => {
    let pd = new PlayerData(1, 1)
    describe ('Normalのモードの場合', () => {
      it ('出せるカードがある', () => {
        let p = new Player(pd)
        let field = new CardData(0, 3)
        p.receive(new CardData(2, 2))
        p.receive(new CardData(3, 3))
        assert.equal(p.canPut(field, false), true)
      })
      it ('出せるカードがない', () => {
        let p = new Player(pd)
        let field = new CardData(0, 3)
        p.receive(new CardData(2, 2))
        p.receive(new CardData(3, 4))
        assert.equal(p.canPut(field, false), false)
      })
    })

    describe ('ForceDrawモードの場合', () => {
      it ('出せるカードがある (2がある)', () => {
        let p = new Player(pd)
        let field = new CardData(1, 2)
        p.receive(new CardData(0, 2))
        p.receive(new CardData(4, 0))
        assert.equal(p.canPut(field, true), true)
      })
      it ('出したいカードがない (2がない)', () => {
        let p = new Player(pd)
        let field = new CardData(1, 2)
        p.receive(new CardData(0, 9))
        p.receive(new CardData(4, 0))
        assert.equal(p.canPut(field, true), false)
      })
    })
  })

  describe('.hasNoCard()', () => {
    describe('手札が無いかどうかを返すことができる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      it('手札が無い場合はTrueを返す', () => {
        assert.equal(p.hasNoCard(), true)
      })

      it('手札がある場合はFalseを返す', () => {
        p.receive(new CardData(1, 8))
        assert.equal(p.hasNoCard(), false)
      })
    })
  })

  describe('.isHuman()', () => {
    describe('プレイヤータイプが人間かどうかを返すことができる', () => {
      it('人間である場合はTrueを返す', () => {
        let pd = new PlayerData(1, PlayerType.Human)
        let p = new Player(pd)
        assert.equal(p.isHuman(), true)
      })

      it('人間ではない場合はFalseを返す', () => {
        let pd = new PlayerData(1, PlayerType.Computer)
        let p = new Player(pd)
        assert.equal(p.isHuman(), false)
      })
    })
  })

  describe('.isComputer()', () => {
    describe('プレイヤータイプがコンピューターかどうかを返すことができる', () => {
      it('コンピューターである場合はTrueを返す', () => {
        let pd = new PlayerData(1, PlayerType.Computer)
        let p = new Player(pd)
        assert.equal(p.isComputer(), true)
      })

      it('コンピューターではない場合はFalseを返す', () => {
        let pd = new PlayerData(1, PlayerType.Human)
        let p = new Player(pd)
        assert.equal(p.isComputer(), false)
      })
    })
  })
})
