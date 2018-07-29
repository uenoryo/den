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
  })
})
