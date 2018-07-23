import assert from 'assert'
import Constants from '../../constants'
import Player from '../../models/Player'
import CardData from '../../data/CardData'
import PlayerData from '../../data/PlayerData'
import ScoreKeeper from '../../models/ScoreKeeper'

describe('ScoreKeeper', () => {
  describe('.constructor()', () => {
    it ('正しく初期化できる', () => {
      new ScoreKeeper()
    })
  })

  describe('.keep()', () => {
    describe('記録を残すことができる', () => {
      let players = {
        1: new Player(new PlayerData(1, 1)),
        2: new Player(new PlayerData(2, 1)),
        3: new Player(new PlayerData(3, 1)),
        4: new Player(new PlayerData(4, 1)),
      }

      // Player1 の手札: コスト2
      players[1].receive(new CardData(0, 1))
      players[1].receive(new CardData(0, 3))

      // Player2 の手札: コスト6
      players[2].receive(new CardData(0, 8))
      players[2].receive(new CardData(1, 8))

      // Player3 の手札: コスト3
      players[3].receive(new CardData(0, 2))
      players[3].receive(new CardData(0, 5))

      // Player4 の手札: コスト0
      //

      // Player4 が素上がりで勝利
      let sk = new ScoreKeeper()
      sk.keep(4, 2, Constants.GameSetTypePlainDone, players)
      let score = sk.scores[0]

      it ('Player4がWinnerとして記録されている', () => {
        assert.equal(score.WinnerID, 4)
      })

      it ('Loserは無し', () => {
        assert.equal(score.LoserID, null)
      })

      it ('ゲームセットタイプは素上がり', () => {
        assert.equal(score.Type, Constants.GameSetTypePlainDone)
      })

      it ('Player1のスコアが記録されている', () => {
        assert.equal(score.Player1HandCost, -2)
      })

      it ('Player2のスコアが記録されている', () => {
        assert.equal(score.Player2HandCost, -6)
      })

      it ('Player3のスコアが記録されている', () => {
        assert.equal(score.Player3HandCost, -3)
      })

      it ('Player4のスコアが記録されている', () => {
        assert.equal(score.Player4HandCost, 11)
      })
    })
  })
})
