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

    // context('値がバリデーションされる', () => {
    //   it('正しく設定される', () => {
    //     new ScoreData(GameSetType.Den, 1, 2, 50, -30, -10, -10)
    //   })

    //   it('正しく設定される (pank)', () => {
    //     new ScoreData(GameSetType.Den, 0, 2, 50, -150, 50, 50)
    //   })

    //   it('widthと一致しない場合はエラー', () => {
    //     assert.throws(() => { new ScoreData(GameSetType.Den, 1, 2, 60, -30, 10, -10) })
    //   })

    //   it('widthと一致しない場合はエラー (pank)', () => {
    //     assert.throws(() => { new ScoreData(GameSetType.Den, 0, 2, 50, -100, 50, 50) })
    //   })
    // })
  })
})
