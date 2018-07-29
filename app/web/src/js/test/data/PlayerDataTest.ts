import * as mocha from "mocha";
import * as assert from 'power-assert';
import PlayerData from '../../data/PlayerData'

describe('PlayerData', () => {
  describe('.constructor()', () => {
    let pd = new PlayerData(2, 'computer')
    it('IDが正しく設定される', function () {
      assert.equal(pd.ID, 2)
    })
    it('タイプが正しく設定される', function () {
      assert.equal(pd.Type, 'computer')
    })
  })
})
