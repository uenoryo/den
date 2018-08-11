import * as mocha from "mocha"
import * as assert from 'power-assert'
import ScoreData from '../../data/ScoreData'
import { GameSetType } from '../../type/Type'

describe('ScoreData', () => {
  describe('.constructor()', () => {
    context('正しく初期化できる', () => {
      let sd = new ScoreData(GameSetType.PlainDone)

      it('GameSetType が正しく設定される', () => {
        assert.equal(sd.GameSetType, GameSetType.PlainDone)
      })

      it('WinnerID が正しく設定される', () => {
        assert.equal(sd.WinnerID, 0)
      })

      it('LoserID が正しく設定される', () => {
        assert.equal(sd.LoserID, 0)
      })

      it('幅は 0', () => {
        assert.equal(sd.Width, 0)
      })
    })
  })

  describe('.isValidScore()', () => {
    it('初期値は正常', () => {
      let sd = new ScoreData(GameSetType.Den)
      assert.equal(sd.isValidScore(), true)
    })

    it('スコアが正しく入力されていれば true を返す', () => {
      let sd = new ScoreData(GameSetType.Den)
      sd.WinnerID = 1
      sd.setScore(1, 150)
      sd.setScore(2, -50)
      sd.setScore(3, -50)
      sd.setScore(4, -50)
      assert.equal(sd.isValidScore(), true)
    })

    it('スコアが正しく入力されていれば true を返す (pank)', () => {
      let sd = new ScoreData(GameSetType.Den)
      sd.LoserID = 1
      sd.setScore(1, -150)
      sd.setScore(2, 50)
      sd.setScore(3, 50)
      sd.setScore(4, 50)
      assert.equal(sd.isValidScore(), true)
    })

    it('widthと一致しない場合は false を返す', () => {
      let sd = new ScoreData(GameSetType.Den)
      sd.WinnerID = 1
      sd.setScore(1, 160)
      sd.setScore(2, -50)
      sd.setScore(3, -50)
      sd.setScore(4, -50)
      assert.equal(sd.isValidScore(), false)
    })

    it('widthと一致しない場合は false を返す (pank)', () => {
      let sd = new ScoreData(GameSetType.Den)
      sd.LoserID = 1
      sd.setScore(1, -160)
      sd.setScore(2, 50)
      sd.setScore(3, 50)
      sd.setScore(4, 50)
      assert.equal(sd.isValidScore(), false)
    })

    describe('.isValidPlayerID()', () => {
      it('初期値は false', () => {
        let sd = new ScoreData(GameSetType.Den)
        assert.equal(sd.isValidPlayerID(), false)
      })

      it('WinnerID と LoserID が違っていれば true を返す', () => {
        let sd = new ScoreData(GameSetType.Den)
        sd.WinnerID = 1
        sd.LoserID = 2
        assert.equal(sd.isValidPlayerID(), true)
      })

      it('WinnerID と LoserID が同じであれば false を返す', () => {
        let sd = new ScoreData(GameSetType.Den)
        sd.WinnerID = 1
        sd.LoserID = 1
        assert.equal(sd.isValidPlayerID(), false)
      })
    })
  })
})
