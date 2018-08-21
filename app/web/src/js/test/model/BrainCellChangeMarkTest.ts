import * as mocha from "mocha"
import * as assert from 'power-assert'
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'
import BrainData from '../../data/BrainData'
import { CardMark } from '../../type/Type'
import { CardMarksWithoutJokerB } from '../../constant/Card'
import BrainCellChangeMark from '../../model/BrainCellChangeMark'

describe('ScoreKeeper', () => {

  describe('.mostHighPriorityCardMark()', () => {
    it('優先度が高いカードのMarkを返すことができる', () => {
      let bd = new BrainData
      let hand = new HandData([
        new CardData(CardMark.Club, 1),
        new CardData(CardMark.Diamond, 1),
        new CardData(CardMark.Heart, 1),
        new CardData(CardMark.Spade, 1),
      ])
      bd.SelfHand = hand
      bd.HandPriorities = [ [ -1, 0 ], [ 2, 1 ] ]
      assert.equal(BrainCellChangeMark.mostHighPriorityCardMark(bd, 100), CardMark.Heart)
    })
  })

  describe('.randMark()', () => {
    it('Markをランダムに返すことができる', () => {
      for (let i = 0; i < 10; i++) {
        let mark = BrainCellChangeMark.randMark()
        assert.equal(CardMarksWithoutJokerB.includes(mark), true)
      }
    })
  })

  describe('.hit()', () => {
    context('パラメータの確率でtrueを返すことができる', () => {
      it('0は必ずfalse', () => {
        assert.equal(BrainCellChangeMark.hit(0), false)
      })

      it('100は必ずtrue', () => {
        assert.equal(BrainCellChangeMark.hit(100), true)
      })
    })
  })
})
