import assert from 'assert'
import Constants from '../../constants'
import Deck from '../../models/Deck'
import DeckData from '../../data/DeckData'
import CardData from '../../data/CardData'
import Player from '../../models/Player'
import PlayerData from '../../data/PlayerData'
import Dealer from '../../models/Dealer'

describe('Dealer', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      let deck = new Deck(new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ]))
      new Dealer(deck)
    })

    it('デッキがおかしい場合はエラーになる', () => {
      assert.throws(() => {new Dealer(0)})
    })
  })

  describe('.draw()', () => {
    it('カードを引くことができる', () => {
      let deck = new Deck(new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ]))
      let d = new Dealer(deck)
      let card = d.draw()
      assert.equal(card.Mark, 1)
      assert.equal(card.Num, 1)
    })
  })

  describe('.shuffle()', () => {
    it('シャッフルしても枚数は変わらない', () => {
      let deck = new Deck(new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ]))
      let d = new Dealer(deck)
      let length = d.deck.data.Cards.length
      d.shuffle()
      assert.equal(d.deck.data.Cards.length, length)
    })
  })

  describe ('.receive()', () => {
    describe ('カードをフィールドに出すことができる', () => {
      it ('カードがフィールドの先頭に追加される')

      it ('カードを出したプレイヤーのIDが保存される')
    })
  })

  describe('.deal()', () => {
    it('カードを引いてプレイヤーに渡すことができる', () => {
      let deck = new Deck(new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ]))
      let d = new Dealer(deck)
      let player = new Player(new PlayerData(1, 1))
      d.deal(player)
      assert.equal(player.hand.Cards[0].Mark, 1)
      assert.equal(player.hand.Cards[0].Num, 1)
    })
  })

  describe('.put()', () => {
    it('カードを引いてフィールドにセットできる', () => {
      let deck = new Deck(new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ]))
      let d = new Dealer(deck)
      d.put()
      assert.equal(d.field.Cards[0].Mark, 1)
      assert.equal(d.field.Cards[0].Num, 1)
    })
  })

  describe('.fieldCard()', () => {
    it('１番上にあるフィールドのカードを取得できる', () => {
      let deck = new Deck(new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ]))
      let d = new Dealer(deck)
      d.put()

      let card = d.fieldCard()
      assert.equal(card.Mark, 1)
      assert.equal(card.Num, 1)
    })

    it('フィールドにカードがなければnullを返す', () => {
      let deck = new Deck(new DeckData([]))
      let d = new Dealer(deck)

      assert.equal(d.fieldCard(), null)
    })
  })

  describe('.maintenance()', () => {
    it('フィールドのカードを１枚残して他のカードを全てデッキに入れられる', () => {
      let deck = new Deck(new DeckData([
        new CardData(0, 1),
        new CardData(1, 2),
        new CardData(2, 3),
        new CardData(3, 4),
      ]))
      let d = new Dealer(deck)
      d.put()
      d.put()
      d.put()

      d.maintenance()
      assert.equal(d.deck.data.Cards.length, 3)
    })
  })

  describe('.shouldMaintenance()', () => {
    describe('デッキをメンテナンスすべきかどうかを返すことができる', () => {
      it('デッキのカードの枚数が DeckShuffleRemainingAmount 以下であればTrueを返す', () => {
        let deck = new Deck(new DeckData([]))
        let d = new Dealer(deck)
        assert.equal(d.shouldMaintenance(), true)
      })
      it('デッキのカードの枚数が DeckShuffleRemainingAmount より多ければFalseを返す', () => {
        let deck = new Deck(new DeckData([
          new CardData(0, 1),
        ]))
        let d = new Dealer(deck)
        assert.equal(d.shouldMaintenance(), false)
      })
    })
  })

  describe('.goNextTrun()', () => {
    it('次のターンに進めることができる')
  })

  describe ('.playerIsTurnPlayer()', () => {
    describe ('プレイヤーIDを受け取り、そのプレイヤーが現在のターンプレイヤーかどうかを返すことができる', () => {
      it ('現在のターンプレイヤーと一致する場合Trueを返す')

      it ('現在のターンプレイヤーと一致しない場合Falseを返す')
    })
  })

  describe('.turnPlayer()', () => {
    it('エントリープレイヤーの中から現在のターンのプレイヤーを返すことができる')
  })

  describe('.reverseTurnTable()', () => {
    it('ターンを逆順にできる')
  })

  describe ('.increaseForceDrawAmount()', () => {
    it ('forceDrawAmountを増加させることができる')
  })

  describe ('.changePhase()', () => {
    describe ('フェーズを切り替えることができる', () => {
      it ('特定のフェーズに切り替えることができる')

      it ('存在しないフェーズを指定した場合は Normal フェーズになる')
    })
  })

  describe ('.judgeDen()', () => {
    // フィールドのカードは spade の 13
    let deck = new Deck(new DeckData([
      new CardData(3, 13),
    ]))
    let d = new Dealer(deck)
    d.put()

    let pd = new PlayerData(1, 1)

    describe ('普通のDENを判定することができる', () => {
      it ('手札の合計が一致する場合はDEN', () => {
        let p = new Player(pd)
        p.receive(new CardData(0, 1))
        p.receive(new CardData(0, 2))
        p.receive(new CardData(0, 10))
        assert.equal(d.judgeDen(p), Constants.GameSetTypeDen)
      })
      it ('手札に同じ数字が3枚ある場合は暗刻', () => {
        let p = new Player(pd)
        p.receive(new CardData(0, 1))
        p.receive(new CardData(0, 2))
        p.receive(new CardData(0, 13))
        p.receive(new CardData(1, 13))
        p.receive(new CardData(2, 13))
        assert.equal(d.judgeDen(p), Constants.GameSetTypeAnko)
      })
      it ('3ペア以上あり、ペア以外のカードが1枚でフィールドのカードと一致していたらチートイ', () => {
        let p = new Player(pd)
        p.receive(new CardData(4, 0))
        p.receive(new CardData(5, 0))
        p.receive(new CardData(0, 8))
        p.receive(new CardData(1, 8))
        p.receive(new CardData(2, 8))
        p.receive(new CardData(3, 8))
        p.receive(new CardData(0, 10))
        p.receive(new CardData(1, 10))
        p.receive(new CardData(0, 13))
        assert.equal(d.judgeDen(p), Constants.GameSetTypeChitoi)
      })
      it ('暗刻とチートイどちらも満たしていたらチートイが優先される', () => {
        let p = new Player(pd)
        p.receive(new CardData(2, 3))
        p.receive(new CardData(3, 3))
        p.receive(new CardData(2, 4))
        p.receive(new CardData(3, 4))
        p.receive(new CardData(1, 13))
        p.receive(new CardData(2, 13))
        p.receive(new CardData(3, 13))
        assert.equal(d.judgeDen(p), Constants.GameSetTypeChitoi)
      })
      it ('手札の合計が一致しない場合はnull', () => {
        let p = new Player(pd)
        p.receive(new CardData(0, 1))
        p.receive(new CardData(0, 2))
        assert.equal(d.judgeDen(p), null)
      })
    })
  })
})
