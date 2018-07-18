import assert from 'assert'
import ScoreData from '../../data/ScoreData'

describe ('FieldData', () => {
  describe ('.constructor()', () => {
    it ('正しく初期化できる', () => {
      let sd = new ScoreData(1, 2, 3, 10, 20, 30, 40)
      assert.equal(sd.WinnerID, 1)
      assert.equal(sd.LoserID, 2)
      assert.equal(sd.Type, 3)
      assert.equal(sd.Player1HandCost, 10)
      assert.equal(sd.Player2HandCost, 20)
      assert.equal(sd.Player3HandCost, 30)
      assert.equal(sd.Player4HandCost, 40)
    })
  })
})
