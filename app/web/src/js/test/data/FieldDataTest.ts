import * as mocha from "mocha";
import * as assert from 'power-assert';
import CardData from '../../data/CardData'
import FieldData from '../../data/FieldData'

describe('FieldData', () => {
  describe('.constructor()', () => {
    let fd = new FieldData([
        new CardData(0, 1),
        new CardData(0, 2),
        new CardData(0, 3),
    ])
    it('カードが正しく設定される', () => {
      assert.equal(fd.Cards[0].Mark, 0)
      assert.equal(fd.Cards[0].Num, 1)
    })
    it('プレイヤーIDの初期値はnull', () => {
      assert.equal(fd.PutPlayerID, null)
    })
  })

  describe('.top()', () => {
    it('フィールドに出されているカードのトップを取得できる', () => {
      let field = new FieldData([
          new CardData(0, 1),
          new CardData(0, 2),
          new CardData(0, 3),
      ])
      let card = field.top()
      if (card === null) {
        throw new Error('error field top')
      }
      assert.equal(card.Mark, 0)
      assert.equal(card.Num, 3)
    })
    it('出されていなければnullが返る', () => {
      let field = new FieldData([])
      let card = field.top()
      assert.equal(card, null)
    })
  })
})
