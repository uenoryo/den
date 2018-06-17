import assert from 'assert'
import CardData from '../../data/CardData'
import Constants from '../../constants'

describe('CardData', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      let cd = new CardData(1, 13)
      assert.equal(cd.Mark, 1)
      assert.equal(cd.Num, 13)
    })

    it('マークがおかしい場合はエラーになる', () => {
      assert.throws(() => {new CardData('invalid Mark', 1)})
    })

    it('数字がおかしい場合はエラーになる', () => {
      assert.throws(() => {new CardData(1, 14)});
    })
  })

  describe('.mark()', () => {
    it('マークを更新できる', () => {
      let cd = new CardData(3, 6)
      assert.equal(cd.Mark, 3)

      cd = cd.mark(0)
      assert.equal(cd.Mark, 0)
      assert.equal(cd.constructor.name, 'CardData')
    })

    it('マークがおかしい場合はエラーになる', () => {
      let cd = new CardData(1, 2)
      assert.throws(() => {cd.mark(33333)})
    })
  })

  describe('.num()', () => {
    it('数字を更新できる', () => {
      let cd = new CardData(2, 8)
      assert.equal(cd.Num, 8)

      cd = cd.num(11)
      assert.equal(cd.Num, 11)
      assert.equal(cd.constructor.name, 'CardData')
    })

    it('数字がおかしい場合はエラーになる', () => {
      let cd = new CardData(3, 3)
      assert.throws(() => {cd.num(66666)})
    })

    it('Jokerは特別な数字で扱う', () => {
      new CardData(Constants.CardMarkJoker, Constants.CardJokerNum)
    })

    it('Jokerの数字がおかしい場合はエラーになる', () => {
      assert.throws(() => {new CardData(Constants.CardMarkJoker, 10)})
    })
  })

  describe('.toString()', () => {
    it('文字列に変換したものを取得できる', () => {
      let cd = new CardData(2, 13)
      assert.equal(cd.toString(), '♡ K')
    })
  })
})
