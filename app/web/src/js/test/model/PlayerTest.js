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
    describe('プレイヤータイプがコンピューターかどうかを返すことができる', () => {
      it('コンピューターである場合はTrueを返す', () => {
        let pd = new PlayerData(1, Constants.PlayerTypeComputer)
        let p = new Player(pd)
        assert.equal(p.isComputer(), true)
      })

      it('コンピューターではない場合はFalseを返す', () => {
        let pd = new PlayerData(1, Constants.PlayerTypeHuman)
        let p = new Player(pd)
        assert.equal(p.isComputer(), false)
      })
    })
  })

  describe('.handNumAmount()', () => {
    let pd = new PlayerData(1, 1)
    it ('指定された数字のカードが手札に何枚含まれているかを返すことができる', () => {
        let p = new Player(pd)
        p.receive(new CardData(0, 2))
        p.receive(new CardData(0, 10))
        p.receive(new CardData(1, 10))
        p.receive(new CardData(2, 10))
        assert.equal(p.handNumAmount(2), 1)
        assert.equal(p.handNumAmount(10), 3)
    })
    it ('存在しない数字を指定されたら0を返す', () => {
        let p = new Player(pd)
        p.receive(new CardData(0, 2))
        p.receive(new CardData(0, 10))
        assert.equal(p.handNumAmount(99), 0)
    })
  })

  describe('.handPairCount()', () => {
    describe ('手札に含まれているペアの数を返すことができる', () => {
      let pd = new PlayerData(1, 1)
      it ('ペアなし', () => {
          let p = new Player(pd)
          p.receive(new CardData(0, 1))
          p.receive(new CardData(0, 2))
          p.receive(new CardData(0, 3))
          assert.equal(p.handPairCount(), 0)
      })
      it ('1ペア', () => {
          let p = new Player(pd)
          p.receive(new CardData(0, 1))
          p.receive(new CardData(0, 2))
          p.receive(new CardData(1, 2))
          assert.equal(p.handPairCount(), 1)
      })
      it ('2ペア', () => {
          let p = new Player(pd)
          p.receive(new CardData(0, 4))
          p.receive(new CardData(0, 5))
          p.receive(new CardData(1, 5))
          p.receive(new CardData(0, 6))
          p.receive(new CardData(1, 6))
          p.receive(new CardData(2, 6))
          assert.equal(p.handPairCount(), 2)
      })
      it ('3ペア (同じカード4枚も含む)', () => {
          let p = new Player(pd)
          p.receive(new CardData(3, 11))
          p.receive(new CardData(0, 9))
          p.receive(new CardData(1, 9))
          p.receive(new CardData(2, 9))
          p.receive(new CardData(3, 9))
          p.receive(new CardData(4, 0))
          p.receive(new CardData(5, 0))
          p.receive(new CardData(0, 13))
          assert.equal(p.handPairCount(), 3)
      })
    })
  })

  describe('.lonelyHandNumForChitoi()', () => {
    describe ('ペアがない1種類のカードを返すことができる', () => {
      let pd = new PlayerData(1, 1)
      it ('該当しない (ペア以外が複数ある)', () => {
          let p = new Player(pd)
          p.receive(new CardData(0, 1))
          p.receive(new CardData(1, 1))
          p.receive(new CardData(0, 2))
          p.receive(new CardData(0, 3))
          assert.equal(p.lonelyHandNumForChitoi(), null)
      })
      it ('該当しない (ペアのみ)', () => {
          let p = new Player(pd)
          p.receive(new CardData(0, 4))
          p.receive(new CardData(1, 4))
          p.receive(new CardData(0, 5))
          p.receive(new CardData(2, 5))
          assert.equal(p.lonelyHandNumForChitoi(), null)
      })
      it ('該当する (1枚単体)', () => {
          let p = new Player(pd)
          p.receive(new CardData(0, 5))
          assert.equal(p.lonelyHandNumForChitoi(), 5)
      })
      it ('該当する (ペアあり)', () => {
          let p = new Player(pd)
          p.receive(new CardData(0, 8))
          p.receive(new CardData(1, 8))
          p.receive(new CardData(0, 9))
          p.receive(new CardData(1, 9))
          p.receive(new CardData(2, 12))
          assert.equal(p.lonelyHandNumForChitoi(), 12)
      })
    })
  })

  describe('.openHand()', () => {
    it('手札を公開できる')
  })

  describe('.closeHand()', () => {
    it('手札を秘匿できる')
  })

  describe('.handIsReversed()', () => {
    it('手札が公開されているかどうかを返すことができる')
  })
})
