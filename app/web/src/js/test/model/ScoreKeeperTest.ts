import * as mocha from "mocha"
import * as assert from 'power-assert'
import { testPlayers } from '../Helpers'
import { GameSetType } from '../../type/Type'
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'
import ScoreData from '../../data/ScoreData'
import Players from '../../model/Players'
import Player from '../../model/Player'
import ScoreKeeper from '../../model/ScoreKeeper'

describe('ScoreKeeper', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      new ScoreKeeper
    })
  })

  describe('.check()', () => {
    context('scoreが正しく設定されているかをチェックできる', () => {
      let sk = new ScoreKeeper
      it('正しいパターンは何も返らない', () => {
        let sd = new ScoreData
        sd.LoserID = 1
        sd.setScore(1, -30)
        sd.setScore(2, 10)
        sd.setScore(3, 10)
        sd.setScore(4, 10)
        sk.check(sd)
      })

      it('データが正しくなければエラーを投げる', () => {
        let sd = new ScoreData
        sd.LoserID = 1
        sd.setScore(1, -40)
        sd.setScore(2, 10)
        sd.setScore(3, 10)
        sd.setScore(4, 10)
        assert.throws(() => { sk.check(sd) })
      })
    })
  })

  describe('.writePlainDone()', () => {
    context('plain done のスコアを記入できる', () => {
      let players = testPlayers()
      players.get(2).Hand = new HandData([
        new CardData(0, 1),
      ])

      players.get(3).Hand = new HandData([
        new CardData(1, 3),
        new CardData(1, 4),
      ])

      players.get(4).Hand = new HandData([
        new CardData(1, 5),
        new CardData(1, 6),
        new CardData(1, 7),
      ])

      let sk = new ScoreKeeper
      sk.keep(1, 0, GameSetType.PlainDone, players)
      let score = sk.Data[0]

      it('チェックしてもエラーが起きない', () => {
        sk.check(score)
      })

      it('WinnerID が正しく記録されている', () => {
        assert.equal(score.WinnerID, 1)
      })

      it('LoserID が正しく記録されている', () => {
        assert.equal(score.LoserID, 0)
      })

      it('Player1のID が正しく記録されている', () => {
        assert.equal(score.getScore(1), 6 * sk.Rate)
      })

      it('Player2のID が正しく記録されている', () => {
        assert.equal(score.getScore(2), 1 * sk.Rate * -1)
      })

      it('Player3のID が正しく記録されている', () => {
        assert.equal(score.getScore(3), 2 * sk.Rate * -1)
      })

      it('Player4のID が正しく記録されている', () => {
        assert.equal(score.getScore(4), 3 * sk.Rate * -1)
      })
    })
  })

  describe('.writeDen()', () => {
    context('den のスコアを記入できる', () => {
      let players = testPlayers()
      players.get(1).Hand = new HandData([
        new CardData(1, 9),
      ])

      players.get(2).Hand = new HandData([
        new CardData(0, 1),
      ])

      players.get(3).Hand = new HandData([
        new CardData(1, 3),
        new CardData(1, 4),
      ])

      players.get(4).Hand = new HandData([
        new CardData(1, 5),
        new CardData(1, 6),
        new CardData(1, 7),
      ])

      let sk = new ScoreKeeper
      sk.keep(1, 4, GameSetType.Den, players)
      let score = sk.Data[0]

      it('チェックしてもエラーが起きない', () => {
        sk.check(score)
      })

      it('WinnerID が正しく記録されている', () => {
        assert.equal(score.WinnerID, 1)
      })

      it('LoserID が正しく記録されている', () => {
        assert.equal(score.LoserID, 4)
      })

      it('Player1のID が正しく記録されている', () => {
        assert.equal(score.getScore(1), 7 * sk.Rate)
      })

      it('Player2のID が正しく記録されている', () => {
        assert.equal(score.getScore(2), 1 * sk.Rate * -1)
      })

      it('Player3のID が正しく記録されている', () => {
        assert.equal(score.getScore(3), 2 * sk.Rate * -1)
      })

      it('Player4のID が正しく記録されている', () => {
        assert.equal(score.getScore(4), 4 * sk.Rate * -1)
      })
    })
  })

  describe('.writeAnko()', () => {
    context('anko のスコアを記入できる', () => {
      let players = testPlayers()
      players.get(1).Hand = new HandData([
        new CardData(0, 9),
        new CardData(1, 9),
        new CardData(2, 9),
      ])

      players.get(2).Hand = new HandData([
        new CardData(0, 1),
      ])

      players.get(3).Hand = new HandData([
        new CardData(1, 3),
        new CardData(1, 4),
      ])

      players.get(4).Hand = new HandData([
        new CardData(3, 9),
        new CardData(1, 6),
        new CardData(1, 7),
      ])

      let sk = new ScoreKeeper
      sk.keep(1, 4, GameSetType.Anko, players)
      let score = sk.Data[0]

      it('チェックしてもエラーが起きない', () => {
        sk.check(score)
      })

      it('WinnerID が正しく記録されている', () => {
        assert.equal(score.WinnerID, 1)
      })

      it('LoserID が正しく記録されている', () => {
        assert.equal(score.LoserID, 4)
      })

      it('Player1のID が正しく記録されている', () => {
        assert.equal(score.getScore(1), 9 * sk.Rate)
      })

      it('Player2のID が正しく記録されている', () => {
        assert.equal(score.getScore(2), 1 * sk.Rate * -1)
      })

      it('Player3のID が正しく記録されている', () => {
        assert.equal(score.getScore(3), 2 * sk.Rate * -1)
      })

      it('Player4のID が正しく記録されている', () => {
        assert.equal(score.getScore(4), 6 * sk.Rate * -1)
      })
    })
  })
})
