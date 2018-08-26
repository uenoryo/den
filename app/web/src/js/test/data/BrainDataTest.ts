                      import * as mocha from "mocha";
import * as assert from 'power-assert';
import BrainData from '../../data/BrainData'

describe('BrainData', () => {
  describe('.constructor()', () => {
    let bd = new BrainData
    it('フィールドカードの初期値はnull', () => {
      assert.equal(bd.FieldCard, null)
    })
    it('手札カードの初期値はnull', () => {
      assert.equal(bd.SelfHand, null)
    })
    it('出せるカードの配列の初期値は空', () => {
      assert.deepEqual(bd.PuttableIdx, [])
    })
    it('出されたカードの配列の初期値は空', () => {
      assert.deepEqual(bd.PutCards, [])
    })
    it('HandActionPriority は Drawのみが初期値', () => {
      assert.deepEqual(bd.HandPriorities[0], [-1, 0])
    })
  })

  describe('.topPriorityActionID()', () => {
    describe('優先度が最も高いactionIDを返すことができる', () => {
      it('初期値は-1', () => {
        let bd = new BrainData
        assert.equal(bd.topPriorityActionID(), -1)
      })
      it('複数ある場合は優先度が最も高いものが返る', () => {
        let bd = new BrainData
        bd.HandPriorities = [
          [-1, 0],
          [0 , -10],
          [4 , 20],
          [8 , 1],
        ]
        assert.equal(bd.topPriorityActionID(), 4)
      })
      it('優先度が同じ場合はindexが大きい方が帰る', () => {
        let bd = new BrainData
        bd.HandPriorities = [
          [-1, 0],
          [0 , 10],
          [1 , 10],
        ]
        assert.equal(bd.topPriorityActionID(), 1)
      })
    })
  })

  describe('.inputPriority()', () => {
    describe('優先度をセットできる', () => {
      it('追加するパターン', () => {
        let bd = new BrainData
        bd.inputPriority(4, 10)
        assert.deepEqual(bd.HandPriorities[1], [4, 10])
      })
      it('上書きするパターン', () => {
        let bd = new BrainData
        bd.inputPriority(4, 10)
        bd.inputPriority(4, 20)
        assert.deepEqual(bd.HandPriorities[1], [4, 20])
      })
    })
  })
})
