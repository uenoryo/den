import assert from 'assert'
import ScoreData from '../../data/ScoreData'

describe ('FieldData', () => {
  describe ('.constructor()', () => {
    it ('正しく初期化できる', () => {
      let sd = new ScoreData(1, 2, 3, 10, 20, 30, -60)
      assert.equal(sd.WinnerID, 1)
      assert.equal(sd.LoserID, 2)
      assert.equal(sd.Type, 3)
      assert.equal(sd.Player1HandCost, 10)
      assert.equal(sd.Player2HandCost, 20)
      assert.equal(sd.Player3HandCost, 30)
      assert.equal(sd.Player4HandCost, -60)
    })
  })

  describe ('.winnerID()', () => {
    it ('勝利プレイヤーのIDを更新できる', () => {
      let sd = new ScoreData(1, 2, 3, 0, 0, 0, 0)
      assert.equal(sd.WinnerID, 1)

      sd.winnerID(3)

      assert.equal(sd.WinnerID, 3)
    })

    it ('存在しないプレイヤーIDを指定するとエラーになる', () => {
      let sd = new ScoreData(1, 2, 3, 0, 0, 0, 0)
      assert.throws(() => {sd.winnerID(9)})
    })

    it ('既にLoserに設定されているプレイヤーIDを指定するとエラーになる', () => {
      let sd = new ScoreData(1, 2, 3, 0, 0, 0, 0)
      assert.throws(() => {sd.winnerID(2)})
    })
  })

  describe ('.loserID()', () => {
    it ('敗者プレイヤーのIDを更新できる', () => {
      let sd = new ScoreData(1, 2, 3, 0, 0, 0, 0)
      assert.equal(sd.LoserID, 2)

      sd.loserID(3)

      assert.equal(sd.LoserID, 3)
    })

    it ('存在しないプレイヤーIDを指定するとエラーになる', () => {
      let sd = new ScoreData(1, 2, 3, 0, 0, 0, 0)
      assert.throws(() => {sd.loserID(9)})
    })

    it ('既にWinnerに設定されているプレイヤーIDを指定するとエラーになる', () => {
      let sd = new ScoreData(1, 2, 3, 0, 0, 0, 0)
      assert.throws(() => {sd.loserID(1)})
    })
  })

  describe ('.type()', () => {
    it ('ゲームセットタイプを更新できる')
  })

  describe ('.playerHandCosts()', () => {
    it ('手札のコストを更新できる', () => {
      let sd = new ScoreData(1, 2, 3, 0, 0, 0, 0)
      sd.playerHandCosts(20, 30, 40, -90)

      assert.equal(sd.Player1HandCost, 20)
      assert.equal(sd.Player2HandCost, 30)
      assert.equal(sd.Player3HandCost, 40)
      assert.equal(sd.Player4HandCost, -90)
    })

    it ('合計が0にならなければエラーになる', () => {
      let sd = new ScoreData(1, 2, 3, 0, 0, 0, 0)
      assert.throws(() => {sd.playerHandCosts(0, 0, 0, 10)})
    })
  })
})
