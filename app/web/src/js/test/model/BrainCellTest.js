import assert from 'assert'
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'
import BrainData from '../../data/BrainData'
import Brain from '../../models/Brain'
import BrainCell from '../../models/BrainCell'

describe ('BrainCell', () => {
  describe('.canDoneButDraw()', () => {
    let b = new Brain
    it ('素上がりできる状態の時、Drawの優先度を上げる', () => {
      let hand = new HandData([
        new CardData(0, 5),
      ])
      b.input('FieldCard', new CardData(0, 4))
      b.input('SelfHand', hand)
      b.narrow()
      BrainCell.canDoneButDraw(b.data, 10)
      assert.equal(b.data.PuttableIdx['-1'], 10)
    })
    it ('ForceDrawにより絞り込まれた選択肢より手札が多い場合、Drawの優先度はあげない', () => {
      let hand = new HandData([
        new CardData(0, 2),
        new CardData(0, 5),
      ])
      b.input('FieldCard', new CardData(1, 2))
      b.input('SelfHand', hand)
      b.narrow(true)
      BrainCell.canDoneButDraw(b.data)
      assert.equal(b.data.PuttableIdx['-1'], 0)
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

  describe('.waitAnko()', () => {
    let b = new Brain
    describe ('同じ数字のカードが3枚揃っている場合、そのカードの優先度を下げる', () => {
      let hand = new HandData([
        new CardData(0, 5),
        new CardData(1, 5),
        new CardData(2, 5),
        new CardData(0, 6),
      ])
      b.input('SelfHand', hand)

      it ('1枚目', () => {
        b.input('FieldCard', new CardData(0, 7))
        b.narrow()
        BrainCell.waitAnko(b.data, 3)
        assert.equal(b.data.PuttableIdx[0], -3)
      })

      it ('2枚目', () => {
        b.input('FieldCard', new CardData(1, 7))
        b.narrow()
        BrainCell.waitAnko(b.data, 3)
        assert.equal(b.data.PuttableIdx[1], -3)
      })

      it ('3枚目', () => {
        b.input('FieldCard', new CardData(2, 7))
        b.narrow()
        BrainCell.waitAnko(b.data, 3)
        assert.equal(b.data.PuttableIdx[2], -3)
      })

      it ('関係ないカードの優先度はそのまま', () => {
        b.input('FieldCard', new CardData(0, 7))
        b.narrow()
        BrainCell.waitAnko(b.data, 3)
        assert.equal(b.data.PuttableIdx[3], 0)
      })
    })
  })

})
