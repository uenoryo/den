import * as mocha from "mocha";
import * as assert from 'power-assert';
import CardData from '../../data/CardData'
import { CardMark } from '../../type/Type'

describe('CardData', () => {
  describe('.constructor()', () => {
    let cd = new CardData(1, 13)
    it('正しくマークが設定されている', () => {
      assert.equal(cd.Mark, 1)
    })
    it('正しく数字が設定されている', () => {
      assert.equal(cd.Num, 13)
    })
    it('正しくIDが設定されている', () => {
      assert.equal(cd.ID, 49)
    })
    it('正しく表示用のIDが設定されている', () => {
      assert.equal(cd.DisplayID, 49)
    })
    it('正しくスコアを返せる', () => {
      assert.equal(cd.Score, 50)
    })
    it('正しくコストを返せる', () => {
      assert.equal(cd.Cost, 1)
    })
  })

  describe('.toString()', () => {
    it('文字列に変換したものを取得できる', () => {
      let cd = new CardData(2, 13)
      assert.equal(cd.toString(), '♡ K')
    })
  })

  describe('.toStringMark()', () => {
    it('マークを文字列に変換したものを取得できる', () => {
      let cd = new CardData(2, 13)
      assert.equal(cd.toStringMark(), '♡')
    })
  })

  describe('.toStringMark()', () => {
    it('数字を文字列に変換したものを取得できる', () => {
      let cd = new CardData(1, 12)
      assert.equal(cd.toStringNum(), 'Q')
    })
  })

  describe('.isJoker()', () => {
    describe ('Jokerかどうかを返すことができる', () => {
      it('Jokerである', () => {
        let cd = new CardData(4, 0)
        assert.equal(cd.isJoker(), true)
      })
      it('Jokerではない', () => {
        let cd = new CardData(2, 8)
        assert.equal(cd.isJoker(), false)
      })
    })
  })

  describe('.InitailMark()', () => {
    describe ('カードのIDからマークの初期値を返すことができる', () => {
      it('JokerA', () => {
        let cd = new CardData(4, 0)
        assert.equal(cd.InitailMark, CardMark.JokerA)
      })
      it('JokerB', () => {
        let cd = new CardData(5, 0)
        assert.equal(cd.InitailMark, CardMark.JokerB)
      })
      it('Heart', () => {
        let cd = new CardData(2, 10)
        assert.equal(cd.InitailMark, CardMark.Heart)
      })
    })
  })
})
