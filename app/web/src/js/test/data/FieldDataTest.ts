import * as mocha from "mocha";
import * as assert from 'power-assert';
import CardData from '../../data/CardData'
import FieldData from '../../data/FieldData'

describe('FieldData', () => {
  describe('.constructor()', () => {
    let fd = new FieldData([
        new CardData(0, 1),
        new CardData(0, 2),
        new CardData(0, 3),
    ])
    it('カードが正しく設定される', () => {
      assert.equal(fd.Cards[0].Mark, 0)
      assert.equal(fd.Cards[0].Num, 1)
    })
    it('プレイヤーIDの初期値はnull', () => {
      assert.equal(fd.PutPlayerID, null)
    })
  })
  describe('.PutPlayerID()', () => {
    let fd = new FieldData([])
    it('プレイヤーIDが正しく設定される', () => {
      fd.PutPlayerID = 1
      assert.equal(fd.PutPlayerID, 1)
    })
  })
})
