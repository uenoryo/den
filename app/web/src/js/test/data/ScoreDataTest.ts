import * as mocha from "mocha"
import * as assert from 'power-assert'
import ScoreData from '../../data/ScoreData'
import { GameSetType } from '../../type/Type'

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

      it('幅は 0', () => {
        assert.equal(sd.Width, 0)
      })
    })
  })
})
