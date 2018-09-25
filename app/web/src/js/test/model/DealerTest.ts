import * as mocha from "mocha";
import * as assert from 'power-assert';
import { testPlayers } from '../Helpers'
import { Phase, GameSetType } from '../../type/Type'
import DeckData from '../../data/DeckData'
import HandData from '../../data/HandData'
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

  describe('.changeTurnPlayer()', () => {
    it('TurnPlayerを変更できる', () => {
      let d = new Dealer(new DeckData([]))
      d.changeTurnPlayer(3)
      assert.equal(d.TurnPlayerID, 3)
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
    context('フィールドのカードを１枚残して他のカードを全てデッキに入れられる', () => {
      let deck = new DeckData([
        new CardData(0, 8), // WildCard
        new CardData(0, 1),
        new CardData(1, 2),
        new CardData(2, 3),
        new CardData(3, 4),
      ])
      let d = new Dealer(deck)

      // 1枚目はテスト用にWildCardを出してMarkを変えてみる
      d.put()
      let wildcard = d.Field.top()
      if (wildcard !== null) {
        wildcard.changeMark(3)
      }

      d.put()
      d.put()
      d.put()

      d.maintenance()
      it('カードの枚数が変わらない', () => {
        assert.equal(d.Deck.Cards.length, 4)
      })
      it('フィールドカードが正しい', () => {
        assert.equal(d.Deck.Cards[0].Num, 4)
      })
      it('WildCardによって変更されたマークが元に戻っている', () => {
        let hasWildCardClub = false
        for (let card of d.Deck.Cards) {
          if (card.Mark === 0 && card.Num === 8) {
            hasWildCardClub = true
            break
          }
        }
        assert.equal(hasWildCardClub, true)
      })
    })
  })

  describe('.restore()', () => {
    it('フィールドと全プレイヤーの手札を全てデッキに入れられる', () => {
      let deck = new DeckData([
        new CardData(0, 1),
        new CardData(1, 2),
        new CardData(2, 3),
        new CardData(3, 4),
      ])
      let dealer = new Dealer(deck)
      dealer.put()
      dealer.put()
      dealer.put()

      let players = testPlayers()

      players.get(1).Hand = new HandData([
        new CardData(1, 9),
      ])
      players.get(2).Hand = new HandData([
        new CardData(0, 1),
      ])

      players.get(3).Hand = new HandData([
        new CardData(1, 3),
        new CardData(1, 4),
      ])

      players.get(4).Hand = new HandData([
        new CardData(1, 5),
        new CardData(1, 6),
      ])

      dealer.restore(players)

      assert.equal(deck.Cards.length, 10)
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
