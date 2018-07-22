import assert from 'assert'
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'
import BrainData from '../../data/BrainData'
import Brain from '../../models/Brain'
import BrainCell from '../../models/BrainCell'

describe ('BrainCell', () => {
  describe('.canDoneButDraw()', () => {
    describe ('情報を入力できる', () => {
      let b = new Brain
      it ('素上がりできる状態の時、Drawの優先度を上げる', () => {
        let hand = new HandData([
          new CardData(0, 5),
        ])
        b.input('FieldCard', new CardData(0, 4))
        b.input('SelfHand', hand)
        b.narrow()
        BrainCell.canDoneButDraw(b.data)
        assert.equal(b.data.PuttableIdx['-1'], 10)
      })
      it ('素上がりできる状態でなければ、Drawの優先度はデフォルト', () => {
        let hand = new HandData([
          new CardData(1, 5),
        ])
        b.input('FieldCard', new CardData(0, 4))
        b.input('SelfHand', hand)
        b.narrow()
        BrainCell.canDoneButDraw(b.data)
        assert.equal(b.data.PuttableIdx['-1'], 0)
      })
    })
  })
})
