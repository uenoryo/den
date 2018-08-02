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
      assert.equal(bd.SelfCard, null)
    })
    it('出せるカードの配列の初期値は空', () => {
      assert.deepEqual(bd.PuttableIdx, [])
    })
    it('出されたカードの配列の初期値は空', () => {
      assert.deepEqual(bd.PutCards, [])
    })
    it('HandActionPriority は Drawのみが初期値', () => {
      assert.deepEqual(bd.HandActionPriorities[0], [-1, 0])
    })
  })
})
