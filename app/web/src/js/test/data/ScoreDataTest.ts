import * as mocha from "mocha";
import * as assert from 'power-assert';
import ScoreData from '../../data/ScoreData'
import { GameSetType } from '../../type/Type'

describe('ScoreData', () => {
  describe('.constructor()', () => {
    context('正しく初期化できる', () => {
      let sd = new ScoreData(GameSetType.PlainDone, 2, 3, -10, 90, -50, -30)

      it('GameSetType が正しく設定される', () => {
        assert.equal(sd.GameSetType, GameSetType.PlainDone)
      })

      it('WinnerID が正しく設定される', () => {
        assert.equal(sd.WinnerID, 2)
      })

      it('LoserID が正しく設定される', () => {
        assert.equal(sd.LoserID, 3)
      })

      it('幅を計算できる', () => {
        assert.equal(sd.Width, 90)
      })
    })

    context('値がバリデーションされる', () => {
      it('正しく設定される', () => {
        new ScoreData(GameSetType.Den, 1, 2, 50, -30, -10, -10)
      })

      it('正しく設定される (pank)', () => {
        new ScoreData(GameSetType.Den, 0, 2, 50, -150, 50, 50)
      })

      it('widthと一致しない場合はエラー', () => {
        assert.throws(() => { new ScoreData(GameSetType.Den, 1, 2, 60, -30, 10, -10) })
      })

      it('widthと一致しない場合はエラー (pank)', () => {
        assert.throws(() => { new ScoreData(GameSetType.Den, 0, 2, 50, -100, 50, 50) })
      })
    })
  })
})
