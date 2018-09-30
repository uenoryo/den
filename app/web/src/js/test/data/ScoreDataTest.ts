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
    let sd = new ScoreData
    sd.WinnerID = 1
    sd.LoserID = 2
    sd.p1HandCost = 20
    sd.p2HandCost = 20
    sd.p3HandCost = 20
    sd.p4HandCost = 20
    context('ScoreDen のスコア計算ができる', () => {
      it('勝利した場合', () => {
        assert.equal(sd.calcScoreDen(1), 80)
      })

      it ('敗北した場合 (かけられた)', () => {
        assert.equal(sd.calcScoreDen(2), -40)
      })

      it ('敗北した場合 (その他1)', () => {
        assert.equal(sd.calcScoreDen(3), -20)
      })

      it ('敗北した場合 (その他2)', () => {
        assert.equal(sd.calcScoreDen(4), -20)
      })

      it('勝者と敗者のスコアの合計は0になる', () => {
        assert.equal(sd.calcScoreDen(1) + sd.calcScoreDen(2) + sd.calcScoreDen(3) + sd.calcScoreDen(4), 0)
      })
    })
  })

  describe('.calcScoreAnko()', () => {
    let sd = new ScoreData
    sd.WinnerID = 1
    sd.LoserID = 2
    sd.p1HandCost = 30
    sd.p2HandCost = 30
    sd.p3HandCost = 30
    sd.p4HandCost = 30
    context('ScoreAnko のスコア計算ができる', () => {
      it('勝利した場合', () => {
        assert.equal(sd.calcScoreAnko(1), 120)
      })

      it ('敗北した場合 (かけられた)', () => {
        assert.equal(sd.calcScoreAnko(2), -60)
      })

      it ('敗北した場合 (その他1)', () => {
        assert.equal(sd.calcScoreAnko(3), -30)
      })

      it ('敗北した場合 (その他2)', () => {
        assert.equal(sd.calcScoreAnko(4), -30)
      })

      it('勝者と敗者のスコアの合計は0になる', () => {
        assert.equal(sd.calcScoreAnko(1) + sd.calcScoreAnko(2) + sd.calcScoreAnko(3) + sd.calcScoreAnko(4), 0)
      })
    })
  })

  describe('.calcScoreChitoi()', () => {
    let sd = new ScoreData
    sd.WinnerID = 1
    sd.LoserID = 2
    sd.ChitoiPower = 100
    sd.p1HandCost = 50
    sd.p2HandCost = 50
    sd.p3HandCost = 50
    sd.p4HandCost = 50
    context('ScoreChitoi のスコア計算ができる', () => {
      it('勝利した場合', () => {
        assert.equal(sd.calcScoreChitoi(1), 200 + 300)
      })

      it ('敗北した場合 (かけられた)', () => {
        assert.equal(sd.calcScoreChitoi(2), -100 - 100)
      })

      it ('敗北した場合 (その他1)', () => {
        assert.equal(sd.calcScoreChitoi(3), -50 - 100)
      })

      it ('敗北した場合 (その他2)', () => {
        assert.equal(sd.calcScoreChitoi(4), -50 - 100)
      })

      it('勝者と敗者のスコアの合計は0になる', () => {
        assert.equal(sd.calcScoreChitoi(1) + sd.calcScoreChitoi(2) + sd.calcScoreChitoi(3) + sd.calcScoreChitoi(4), 0)
      })
    })
  })

  describe('.getScore()', () => {
    let sd = new ScoreData
    sd.WinnerID = 1
    sd.p1HandCost = 50
    sd.p2HandCost = 50
    sd.p3HandCost = 50
    sd.p4HandCost = 50
    context('指定されているタイプに応じてスコア計算ができる', () => {
      it('Denで勝利した場合', () => {
        sd.Type = GameSetType.Den
        assert.equal(sd.getScore(1), 200)
      })

      it('Denで敗北した場合', () => {
        sd.Type = GameSetType.Den
        assert.equal(sd.getScore(2), -50)
      })

      it ('CounterDenで勝利した場合', () => {
        sd.Type = GameSetType.CounterDen
        assert.equal(sd.getScore(1), 400)
      })

      it ('CounterDenで敗北した場合', () => {
        sd.Type = GameSetType.CounterDen
        assert.equal(sd.getScore(2), -100)
      })
    })
    context('Joker Bonus が計算できる', () => {
      it('成金 Denで勝利した場合', () => {
        sd.Type = GameSetType.Den
        sd.JokerBuff = JokerBuff.Good
        assert.equal(sd.getScore(1), 200 + 15)
      })

      it('成金 Denで敗北した場合', () => {
        sd.Type = GameSetType.Den
        sd.JokerBuff = JokerBuff.Good
        assert.equal(sd.getScore(2), -50 - 5)
      })

      it('一攫千金 Denで勝利した場合', () => {
        sd.Type = GameSetType.Den
        sd.JokerBuff = JokerBuff.Awesome
        assert.equal(sd.getScore(1), 200 + 30)
      })

      it('一攫千金 Denで敗北した場合', () => {
        sd.Type = GameSetType.Den
        sd.JokerBuff = JokerBuff.Awesome
        assert.equal(sd.getScore(2), -50 - 10)
      })
    })
  })
})
