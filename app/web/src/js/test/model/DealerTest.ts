import * as mocha from "mocha";
import * as assert from 'power-assert';
import { Phase, GameSetType } from '../../type/Type'
import DeckData from '../../data/DeckData'
import CardData from '../../data/CardData'
import PlayerData from '../../data/PlayerData'
import Player from '../../model/Player'
import Dealer from '../../model/Dealer'
import Brain from '../../model/Brain'

describe('Dealer', () => {
  describe('.constructor()', () => {
    context('正しく初期化できる', () => {
      let dd = new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ])
      let d = new Dealer(dd)
      it('PhaseがNormalで初期化されている', () => {
        assert.equal(d.Phase.Value, Phase.Normal)
      })
    })
  })

  describe('.draw()', () => {
    it('カードを引くことができる', () => {
      let deck = new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ])
      let d = new Dealer(deck)
      let card = d.draw()
      if (card === null) {
        throw new Error('error draw card.')
      }
      assert.equal(card.Mark, 1)
      assert.equal(card.Num, 1)
    })
  })

  describe('.shuffle()', () => {
    it('シャッフルしても枚数は変わらない', () => {
      let deck = new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ])
      let d = new Dealer(deck)
      let length = d.Deck.Cards.length
      d.shuffle()
      assert.equal(d.Deck.Cards.length, length)
    })
  })

  describe('.deal()', () => {
    it('カードを引いてプレイヤーに渡すことができる', () => {
      let deck = new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ])
      let d = new Dealer(deck)
      let player = new Player(new PlayerData(1, 1), new Brain)
      d.deal(player)
      assert.equal(player.Hand.Cards[0].Mark, 1)
      assert.equal(player.Hand.Cards[0].Num, 1)
    })
  })

  describe('.forceDeal()', () => {
    context('forceDrawAmountを減らしながらプレイヤーにカードを渡すことができる', () => {
      let deck = new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ])
      let d = new Dealer(deck)
      d.increaseForceDrawAmount(10)
      let player = new Player(new PlayerData(1, 1), new Brain)
      d.forceDeal(player)
      it('カードが渡されている', () => {
        assert.equal(player.Hand.Cards[0].Mark, 1)
        assert.equal(player.Hand.Cards[0].Num, 1)
      })
      it('ForceDrawAmountが減っている', () => {
        assert.equal(d.ForceDrawAmount, 9)
      })
    })
  })

  describe('.receive()', () => {
    describe('カードをフィールドに出すことができる', () => {
      let deck = new DeckData([])
      let d = new Dealer(deck)
      d.receive(new CardData(1, 1), 3)
      it('カードがフィールドの先頭に追加される', () => {
        assert.equal(d.Field.Cards[0].Mark, 1)
        assert.equal(d.Field.Cards[0].Num, 1)
      })

      it('カードを出したプレイヤーのIDが保存される', () => {
        assert.equal(d.Field.PutPlayerID, 3)
      })
    })
  })

  describe('.put()', () => {
    it('カードを引いてフィールドにセットできる', () => {
      let deck = new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ])
      let d = new Dealer(deck)
      d.put()
      assert.equal(d.Field.Cards[0].Mark, 1)
      assert.equal(d.Field.Cards[0].Num, 1)
    })
  })

  describe('.maintenance()', () => {
    it('フィールドのカードを１枚残して他のカードを全てデッキに入れられる', () => {
      let deck = new DeckData([
        new CardData(0, 1),
        new CardData(1, 2),
        new CardData(2, 3),
        new CardData(3, 4),
      ])
      let d = new Dealer(deck)
      d.put()
      d.put()
      d.put()

      d.maintenance()
      assert.equal(d.Deck.Cards.length, 3)
      assert.equal(d.Deck.Cards[0].Num, 4)
    })
  })

  describe('.shouldMaintenance()', () => {
    describe('デッキをメンテナンスすべきかどうかを返すことができる', () => {
      it('デッキのカードの枚数が DeckShuffleRemainingAmount 以下であればTrueを返す', () => {
        let deck = new DeckData([])
        let d = new Dealer(deck)
        assert.equal(d.shouldMaintenance(), true)
      })
      it('デッキのカードの枚数が DeckShuffleRemainingAmount より多ければFalseを返す', () => {
        let deck = new DeckData([
          new CardData(0, 1),
        ])
        let d = new Dealer(deck)
        assert.equal(d.shouldMaintenance(), false)
      })
    })
  })

  describe('.judgeDen()', () => {
    // フィールドのカードは spade の 13
    let deck = new DeckData([
      new CardData(3, 13),
    ])
    let d = new Dealer(deck)
    d.put()

    let pd = new PlayerData(1, 1)
    let b = new Brain

    describe('普通のDENを判定することができる', () => {
      it('手札の合計が一致する場合はDEN', () => {
        let p = new Player(pd, b)
        p.receive(new CardData(0, 1))
        p.receive(new CardData(0, 2))
        p.receive(new CardData(0, 10))
        assert.equal(d.judgeDen(p), GameSetType.Den)
      })
      it('手札に同じ数字が3枚ある場合は暗刻', () => {
        let p = new Player(pd, b)
        p.receive(new CardData(0, 1))
        p.receive(new CardData(0, 2))
        p.receive(new CardData(0, 13))
        p.receive(new CardData(1, 13))
        p.receive(new CardData(2, 13))
        assert.equal(d.judgeDen(p), GameSetType.Anko)
      })
      it('3ペア以上あり、ペア以外のカードが1枚でフィールドのカードと一致していたらチートイ', () => {
        let p = new Player(pd, b)
        p.receive(new CardData(4, 0))
        p.receive(new CardData(5, 0))
        p.receive(new CardData(0, 8))
        p.receive(new CardData(1, 8))
        p.receive(new CardData(2, 8))
        p.receive(new CardData(3, 8))
        p.receive(new CardData(0, 10))
        p.receive(new CardData(1, 10))
        p.receive(new CardData(0, 13))
        assert.equal(d.judgeDen(p), GameSetType.Chitoi)
      })
      it('暗刻とチートイどちらも満たしていたらチートイが優先される', () => {
        let p = new Player(pd, b)
        p.receive(new CardData(2, 3))
        p.receive(new CardData(3, 3))
        p.receive(new CardData(2, 4))
        p.receive(new CardData(3, 4))
        p.receive(new CardData(1, 13))
        p.receive(new CardData(2, 13))
        p.receive(new CardData(3, 13))
        assert.equal(d.judgeDen(p), GameSetType.Chitoi)
      })
      it('手札の合計が一致しない場合はnull', () => {
        let p = new Player(pd, b)
        p.receive(new CardData(0, 1))
        p.receive(new CardData(0, 2))
        assert.equal(d.judgeDen(p), null)
      })
    })
  })

  describe('.goNextTurn()', () => {
    describe('ターンテーブルを見て次のターンに進めることができる', () => {
      let deck = new DeckData([
        new CardData(3, 13),
      ])
      let d = new Dealer(deck)
      it('初期プレイヤーのIDを確認', () => {
        assert.equal(d.TurnPlayerID, 1)
      })
      it('次のターンに進められる', () => {
        d.goNextTurn()
        assert.equal(d.TurnPlayerID, 2)
      })
    })
  })

  describe('.playerIsTurnPlayer()', () => {
    describe('プレイヤーがターンプレイヤーかどうか返すことができる', () => {
      let deck = new DeckData([
        new CardData(3, 13),
      ])
      let d = new Dealer(deck)
      it('ターンプレイヤーはtrue', () => {
        assert.equal(d.playerIsTurnPlayer(1), true)
      })
      it('ターンプレイヤーでなければfalse', () => {
        assert.equal(d.playerIsTurnPlayer(4), false)
      })
    })
  })

  describe('.reverseTurnTable()', () => {
    it('ターンテーブルを逆順にできる', () => {
      let deck = new DeckData([])
      let d = new Dealer(deck)
      d.reverseTurnTable()
      assert.deepEqual(d.TurnTable, [4, 3, 2, 1])
    })
  })

  describe('.increaseForceDrawAmount()', () => {
    it('ForceDrawAmountを増加させられる', () => {
      let deck = new DeckData([])
      let d = new Dealer(deck)
      d.increaseForceDrawAmount(20)
      d.increaseForceDrawAmount(10)
      assert.equal(d.ForceDrawAmount, 30)
    })
  })
})
