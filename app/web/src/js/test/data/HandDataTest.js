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

      let dd = new HandData(cards)
      assert.equal(dd.Cards[0].Mark, 0)
      assert.equal(dd.Cards[0].Num, 10)
      assert.equal(dd.Cards[1].Mark, 1)
      assert.equal(dd.Cards[1].Num, 11)
    })

    it ('カードが空でも正しく初期化できる', () => {
      new HandData([])
    })

    it (`最大値が${Constants.PlayerHandMaxAmount}枚で手札が形成されている`)
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

  describe ('get()', () => {
    it ('指定したインデックスのカードを取得できる')
  })
})
