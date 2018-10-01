import * as mocha from "mocha"
import * as assert from 'power-assert'
import ScoreData from '../../data/ScoreData'
import { GameSetType, JokerBuff } from '../../type/Type'

describe('ScoreData', () => {
  describe('.constructor()', () => {
    context('正しく初期化できる', () => {
      let sd = new ScoreData

      it('GameSetType が正しく設定される', () => {
        assert.equal(sd.Type, GameSetType.PlainDone)
      })

      it('WinnerID が正しく設定される', () => {
        assert.equal(sd.WinnerID, 0)
      })

      it('LoserID が正しく設定される', () => {
        assert.equal(sd.LoserID, 0)
      })
    })
  })

  describe('.getHandCost()', () => {
    let sd = new ScoreData
    it('手札のコストを返すことができる', () => {
      sd.p1HandCost = 100
      assert.equal(sd.getHandCost(1), 100)
    })
  })

  describe('.setHandCost()', () => {
    let sd = new ScoreData
    it('手札のコストをセットすることができる', () => {
      sd.setHandCost(1, 100)
      assert.equal(sd.p1HandCost, 100)
    })
  })

  describe('.addHandCost()', () => {
    let sd = new ScoreData
    it('手札のコストを加算することができる', () => {
      sd.addHandCost(1, 10)
      sd.addHandCost(1, 10)
      sd.addHandCost(1, 10)
      assert.equal(sd.p1HandCost, 30)
    })
  })

  describe('.calcScorePlainDone()', () => {
    let sd = new ScoreData
    sd.WinnerID = 1
    sd.p1HandCost = 0
    sd.p2HandCost = 20
    sd.p3HandCost = 20
    sd.p4HandCost = 20
    context('PlainDone のスコア計算ができる', () => {
      it('勝利した場合', () => {
        assert.equal(sd.calcScorePlainDone(1), 60)
      })

      it('敗北した場合', () => {
        assert.equal(sd.calcScorePlainDone(2), -20)
      })

      it('勝者と敗者のスコアの合計は0になる', () => {
        assert.equal(sd.calcScorePlainDone(1) + sd.calcScorePlainDone(2) + sd.calcScorePlainDone(3) + sd.calcScorePlainDone(4), 0)
      })
    })
  })

  describe('.calcScoreDen()', () => {
    let denScore = 3
    let sd = new ScoreData
    sd.WinnerID = 1
    sd.LoserID = 2
    sd.p1HandCost = 2
    sd.p2HandCost = 2
    sd.p3HandCost = 2
    sd.p4HandCost = 2
    context('ScoreDen のスコア計算ができる', () => {
      it('勝利した場合', () => {
        assert.equal(sd.calcScoreDen(1), 8 + denScore)
      })

      it ('敗北した場合 (かけられた)', () => {
        assert.equal(sd.calcScoreDen(2), -2 - 2 - denScore)
      })

      it ('敗北した場合 (その他1)', () => {
        assert.equal(sd.calcScoreDen(3), -2)
      })

      it ('敗北した場合 (その他2)', () => {
        assert.equal(sd.calcScoreDen(4), -2)
      })

      it('勝者と敗者のスコアの合計は0になる', () => {
        assert.equal(sd.calcScoreDen(1) + sd.calcScoreDen(2) + sd.calcScoreDen(3) + sd.calcScoreDen(4), 0)
      })
    })
  })

  describe('.calcScoreAnko()', () => {
    let ankoScore = 3
    let sd = new ScoreData
    sd.WinnerID = 1
    sd.LoserID = 2
    sd.p1HandCost = 3
    sd.p2HandCost = 3
    sd.p3HandCost = 3
    sd.p4HandCost = 3
    context('ScoreAnko のスコア計算ができる', () => {
      it('勝利した場合', () => {
        assert.equal(sd.calcScoreAnko(1), 12 + ankoScore)
      })

      it ('敗北した場合 (かけられた)', () => {
        assert.equal(sd.calcScoreAnko(2), -3 - 3 - ankoScore)
      })

      it ('敗北した場合 (その他1)', () => {
        assert.equal(sd.calcScoreAnko(3), -3)
      })

      it ('敗北した場合 (その他2)', () => {
        assert.equal(sd.calcScoreAnko(4), -3)
      })

      it('勝者と敗者のスコアの合計は0になる', () => {
        assert.equal(sd.calcScoreAnko(1) + sd.calcScoreAnko(2) + sd.calcScoreAnko(3) + sd.calcScoreAnko(4), 0)
      })
    })
  })

  describe('.calcScoreChitoi()', () => {
    let chitoiScore = 5
    let sd = new ScoreData
    sd.WinnerID = 1
    sd.LoserID = 2
    sd.ChitoiPower = 10
    sd.p1HandCost = 5
    sd.p2HandCost = 5
    sd.p3HandCost = 5
    sd.p4HandCost = 5
    context('ScoreChitoi のスコア計算ができる', () => {
      it('勝利した場合', () => {
        assert.equal(sd.calcScoreChitoi(1), 5*4 + 10*3 + chitoiScore)
      })

      it ('敗北した場合 (かけられた)', () => {
        assert.equal(sd.calcScoreChitoi(2), -5 -5 -10 - chitoiScore)
      })

      it ('敗北した場合 (その他1)', () => {
        assert.equal(sd.calcScoreChitoi(3), -5 - 10)
      })

      it ('敗北した場合 (その他2)', () => {
        assert.equal(sd.calcScoreChitoi(4), -5 - 10)
      })

      it('勝者と敗者のスコアの合計は0になる', () => {
        assert.equal(sd.calcScoreChitoi(1) + sd.calcScoreChitoi(2) + sd.calcScoreChitoi(3) + sd.calcScoreChitoi(4), 0)
      })
    })
  })

  describe('.getScore()', () => {
    let sd = new ScoreData
    let denScore = 3
    sd.WinnerID = 1
    sd.LoserID = 2
    sd.p1HandCost = 5
    sd.p2HandCost = 5
    sd.p3HandCost = 5
    sd.p4HandCost = 5
    context('指定されているタイプに応じてスコア計算ができる', () => {
      it('Denで勝利した場合', () => {
        sd.Type = GameSetType.Den
        assert.equal(sd.getScore(1), 5*4 + denScore)
      })

      it('Denで敗北した場合', () => {
        sd.Type = GameSetType.Den
        assert.equal(sd.getScore(2), -5 -5 - denScore)
      })

      it ('CounterDenで勝利した場合', () => {
        sd.Type = GameSetType.CounterDen
        assert.equal(sd.getScore(1), (5*4 + denScore) * 2)
      })

      it ('CounterDenで敗北した場合', () => {
        sd.Type = GameSetType.CounterDen
        assert.equal(sd.getScore(2), (-5 -5 - denScore) * 2)
      })
    })
    context('Joker Bonus が計算できる', () => {
      it('成金 Denで勝利した場合', () => {
        sd.Type = GameSetType.Den
        sd.JokerBuff = JokerBuff.Good
        assert.equal(sd.getScore(1), 5*4 + 3*3 + denScore)
      })

      it('成金 Denで敗北した場合', () => {
        sd.Type = GameSetType.Den
        sd.JokerBuff = JokerBuff.Good
        assert.equal(sd.getScore(2), -5 -5 -3 - denScore)
      })

      it('一攫千金 Denで勝利した場合', () => {
        sd.Type = GameSetType.Den
        sd.JokerBuff = JokerBuff.Awesome
        assert.equal(sd.getScore(1), 5*4 + 5*3 + denScore)
      })

      it('一攫千金 Denで敗北した場合', () => {
        sd.Type = GameSetType.Den
        sd.JokerBuff = JokerBuff.Awesome
        assert.equal(sd.getScore(2), -5 -5 -5 - denScore)
      })
    })
  })
})
