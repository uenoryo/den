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
      it ('手札が少ないケース', () => {
        let cards = [
            new CardData(0, 1),
            new CardData(0, 13),
        ]
        let hd = new HandData(cards)
        assert.equal(hd.Cost, 2)
      })

      it ('手札がないケース', () => {
        let hd = new HandData([])
        assert.equal(hd.Cost, 0)
      })

      it ('手札が多いケース', () => {
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

  describe ('.aggregate()', () => {
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
      let res = hd.aggregate()

      it ('A は 1枚', () => {
        assert.equal(res[1], 1)
      })
      it ('JOKER は 2枚', () => {
        assert.equal(res[0], 2)
      })
      it ('K は 4枚', () => {
        assert.equal(res[13], 4)
      })
      it ('それ以外は 0枚', () => {
        assert.equal(res[2], 0)
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

      it ('A は 1枚', () => {
        assert.equal(hd.numAmount(1), 1)
      })
      it ('JOKER は 2枚', () => {
        assert.equal(hd.numAmount(0), 2)
      })
      it ('K は 4枚', () => {
        assert.equal(hd.numAmount(13), 4)
      })
      it ('6 は 0枚', () => {
        assert.equal(hd.numAmount(6), 0)
      })
    })
  })
})
