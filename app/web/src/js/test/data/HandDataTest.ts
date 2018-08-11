import * as mocha from "mocha";
import * as assert from 'power-assert';
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'

describe('HandData', () => {
  describe('.constructor()', () => {
    let dd = new HandData([
        new CardData(0, 1),
        new CardData(0, 2),
        new CardData(0, 3),
    ])
    it('カードが正しく設定される', () => {
      assert.equal(dd.Cards[0].Mark, 0)
      assert.equal(dd.Cards[0].Num, 1)
    })
    describe ('手札のコストの合計を返すことができる', () => {
      it('手札が少ないケース', () => {
        let cards = [
            new CardData(0, 1),
            new CardData(0, 13),
        ]
        let hd = new HandData(cards)
        assert.equal(hd.Cost, 2)
      })

      it('手札がないケース', () => {
        let hd = new HandData([])
        assert.equal(hd.Cost, 0)
      })

      it('手札が多いケース', () => {
        let cards = [
            new CardData(0, 0), // 5
            new CardData(0, 1), // 1
            new CardData(0, 2), // 2
            new CardData(0, 3), // 1
            new CardData(0, 4), // 1
            new CardData(0, 5), // 1
            new CardData(0, 6), // 1
            new CardData(0, 7), // 1
            new CardData(0, 8), // 3
        ]
        let hd = new HandData(cards)
        assert.equal(hd.Cost, 16)
      })
    })
  })

  describe ('.numAmount()', () => {
    describe ('カードの数字毎に枚数を集計したオブジェクトを返すことができる', () => {
      let cards = [
          new CardData(0, 1),
          new CardData(0, 13),
          new CardData(1, 13),
          new CardData(2, 13),
          new CardData(3, 13),
          new CardData(4, 0),
          new CardData(5, 0),
      ]
      let hd = new HandData(cards)

      it('A は 1枚', () => {
        assert.equal(hd.numAmount(1), 1)
      })
      it('JOKER は 2枚', () => {
        assert.equal(hd.numAmount(0), 2)
      })
      it('K は 4枚', () => {
        assert.equal(hd.numAmount(13), 4)
      })
      it('6 は 0枚', () => {
        assert.equal(hd.numAmount(6), 0)
      })
    })
  })

  describe('.pairCount()', () => {
    describe ('手札に含まれているペアの数を返すことができる', () => {
      it('ペアなし', () => {
        let hand = new HandData([
          new CardData(0, 1),
          new CardData(0, 2),
          new CardData(0, 3),
        ])
        assert.equal(hand.pairCount(), 0)
      })
      it('1ペア', () => {
        let hand = new HandData([
          new CardData(0, 1),
          new CardData(0, 2),
          new CardData(1, 2),
        ])
        assert.equal(hand.pairCount(), 1)
      })
      it('2ペア', () => {
        let hand = new HandData([
          new CardData(0, 4),
          new CardData(0, 5),
          new CardData(1, 5),
          new CardData(0, 6),
          new CardData(1, 6),
          new CardData(2, 6),
        ])
        assert.equal(hand.pairCount(), 2)
      })
      it('3ペア (同じカード4枚も含む)', () => {
        let hand = new HandData([
          new CardData(3, 11),
          new CardData(0, 9),
          new CardData(1, 9),
          new CardData(2, 9),
          new CardData(3, 9),
          new CardData(4, 0),
          new CardData(5, 0),
          new CardData(0, 13),
        ])
        assert.equal(hand.pairCount(), 3)
      })
    })
  })

  describe('.lonelyNumForChitoi()', () => {
    describe ('ペアがない1種類のカードを返すことができる', () => {
      it('該当しない (ペア以外が複数ある)', () => {
        let deck = new HandData([
          new CardData(0, 1),
          new CardData(1, 1),
          new CardData(0, 2),
          new CardData(0, 3),
        ])
        assert.equal(deck.lonelyNumForChitoi(), null)
      })
      it('該当しない (ペアのみ)', () => {
        let deck = new HandData([
          new CardData(0, 4),
          new CardData(1, 4),
          new CardData(0, 5),
          new CardData(2, 5),
        ])
        assert.equal(deck.lonelyNumForChitoi(), null)
      })
      it('該当する (1枚単体)', () => {
        let deck = new HandData([
          new CardData(0, 5)
        ])
        assert.equal(deck.lonelyNumForChitoi(), 5)
      })
      it('該当する (複数ペア)', () => {
        let deck = new HandData([
          new CardData(0, 8),
          new CardData(1, 8),
          new CardData(0, 2),
          new CardData(1, 2),
          new CardData(2, 5),
        ])
        assert.equal(deck.lonelyNumForChitoi(), 5)
      })
      it('該当する (Ankoを満たすペア)', () => {
        let deck = new HandData([
          new CardData(0, 8),
          new CardData(1, 8),
          new CardData(0, 9),
          new CardData(1, 9),
          new CardData(2, 9),
        ])
        assert.equal(deck.lonelyNumForChitoi(), 9)
      })
    })
  })

  describe ('.isReach()', () => {
    describe ('手札の枚数が残り1枚かどうかを返すことができる', () => {
      it ('手札の枚数が残り複数枚', () => {
        let cards = [
            new CardData(0, 1),
            new CardData(0, 13),
        ]
        let hd = new HandData(cards)
        assert.equal(hd.isReach(), false)
      })

      it ('手札の枚数が残り1枚', () => {
        let hd = new HandData([
          new CardData(0, 1)
        ])
        assert.equal(hd.isReach(), true)
      })
    })
  })
})
