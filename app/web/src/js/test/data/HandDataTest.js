import assert from 'assert'
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'
import Constants from '../../constants'

describe ('HandData', () => {
  describe ('.constructor()', () => {
    it ('正しく初期化できる', () => {
      let cards = [
          new CardData(0, 10),
          new CardData(1, 11),
      ]

      let hd = new HandData(cards)
      assert.equal(hd.Cards[0].Mark, 0)
      assert.equal(hd.Cards[0].Num, 10)
      assert.equal(hd.Cards[1].Mark, 1)
      assert.equal(hd.Cards[1].Num, 11)
    })

    it ('カードが空でも正しく初期化できる', () => {
      new HandData([])
    })

    describe (`手札が形成されている`, () => {
      let cards = [
          new CardData(2, 5),
          new CardData(1, 11),
      ]
      let hd = new HandData(cards)

      it (`枚数が${Constants.PlayerHandMaxAmount}枚である`, () => {
        assert.equal(hd.Hand.length, Constants.PlayerHandMaxAmount)
      })

      it ('手札にカードが入っている', () => {
        assert.equal(hd.Hand[0].Mark, 2)
        assert.equal(hd.Hand[0].Num, 5)
        assert.equal(hd.Hand[1].Mark, 1)
        assert.equal(hd.Hand[1].Num, 11)
      })

      it ('範囲外はnullである', () => {
        assert.equal(hd.Hand[Constants.PlayerHandMaxAmount], null)
      })
    })
  })

  describe ('.cards()', () => {
    it ('カードを更新できる', () => {
      let cards = [
          new CardData(2, 12),
      ]
      let dd = new HandData(cards)

      assert.equal(dd.Cards[0].Mark, 2)
      assert.equal(dd.Cards[0].Num, 12)

      cards = [
        new CardData(3, 13),
      ]
      dd.cards(cards)

      assert.equal(dd.Cards[0].Mark, 3)
      assert.equal(dd.Cards[0].Num, 13)
    })

    it ('カード以外を入れようとした場合はエラーになる', () => {
      let cards = ['dummy card']
      assert.throws(() => {new HandData(cards)})
    })
  })

  describe ('.set()', () => {
    it ('カードをセットできる')
  })

  describe ('.get()', () => {
    it ('指定したインデックスのカードを取得できる')
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
      it ('それ以外は undefined', () => {
        assert.equal(res[2], undefined)
      })
    })
  })
})
