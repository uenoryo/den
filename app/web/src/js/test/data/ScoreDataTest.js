import assert from 'assert'
import ScoreData from '../../data/ScoreData'

describe ('ScoreData', () => {
  describe ('.constructor()', () => {
    it ('正しく初期化できる', () => {
      let sd = new ScoreData(1, 2, 3, 50, -20, -20, -10)
      assert.equal(sd.WinnerID, 1)
      assert.equal(sd.LoserID, 2)
      assert.equal(sd.Type, 3)
      assert.equal(sd.Player1HandCost, 50)
      assert.equal(sd.Player2HandCost, -20)
      assert.equal(sd.Player3HandCost, -20)
      assert.equal(sd.Player4HandCost, -10)
    })

    it ('合計が0にならなければエラーになる', () => {
      assert.throws(() => {new ScoreData(1, 2, 3, 10, 0, 0, 0)})
    })
    it ('合計が0にならなければエラーになる (winner が null)', () => {
      assert.throws(() => {new ScoreData(null, 2, 3, 10, 0, 0, 0)})
    })
    it ('Winner がマイナスだとエラーになる', () => {
      assert.throws(() => {new ScoreData(1, 2, 3, -50, 10, 10, 30)})
    })
    it ('Loser がプラスだとエラーになる', () => {
      assert.throws(() => {new ScoreData(1, 2, 3, -10, 50, -10, -30)})
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
      sd.playerHandCosts(100, -30, -40, -30)

      assert.equal(sd.Player1HandCost, 100)
      assert.equal(sd.Player2HandCost, -30)
      assert.equal(sd.Player3HandCost, -40)
      assert.equal(sd.Player4HandCost, -30)
    })

    it ('合計が0にならなければエラーになる', () => {
      let sd = new ScoreData(1, 2, 3, 0, 0, 0, 0)
      assert.throws(() => {sd.playerHandCosts(0, 0, 0, 10)})
    })
  })

  describe ('._isValidScoresOrFail()', () => {
    it ('有効なパターン', () => {
      let sd = new ScoreData(1, 2, 3, 50, -20, -20, -10)
      assert.equal(sd._isValidScoresOrFail(), null)
    })

    it ('有効なパターン (winnerIDがnull)', () => {
      let sd = new ScoreData(null, 2, 3, 50, -150, 50, 50)
      assert.equal(sd._isValidScoresOrFail(), null)
    })
  })
})
