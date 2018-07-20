import assert from 'assert'
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'
import Brain from '../../models/Brain'

describe ('Brain', () => {
  describe ('.constructor()', () => {
    it ('正しく初期化できる', () => {
      new Brain
    })
  })

  describe('.input()', () => {
    describe ('情報を入力できる', () => {
      let b = new Brain
      it ('フィールドカードを記憶できる', () => {
        b.input('FieldCard', new CardData(0, 10))
        assert.equal(b.data.FieldCard.Mark, 0)
        assert.equal(b.data.FieldCard.Num, 10)
      })

      it ('自身の手札を記憶できる', () => {
        b.input('SelfHand', new HandData([new CardData(2, 4)]))
        assert.equal(b.data.SelfHand.Cards[0].Mark, 2)
        assert.equal(b.data.SelfHand.Cards[0].Num, 4)
      })

      it ('フィールドに置かれたカードを記憶できる', () => {
        b.input('PutCard', new CardData(3, 3))
        assert.equal(b.data.PutCards[0].Mark, 3)
        assert.equal(b.data.PutCards[0].Num, 3)
      })
    })
  })
})
