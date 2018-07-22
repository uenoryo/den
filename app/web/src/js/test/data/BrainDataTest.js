import assert from 'assert'
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'
import BrainData from '../../data/BrainData'
import Constants from '../../constants'

describe ('BrainData', () => {
  describe ('.constructor()', () => {
    it('正しく初期化できる', () => {
      let bd = new BrainData
      assert.equal(bd.FieldCard, null)
      assert.equal(bd.SelfHand, null)
      assert.deepEqual(bd.PutCards, [])
    })
  })

  describe ('.fieldCard()', () => {
    it ('フィールドカードを更新できる', () => {
      let bd = new BrainData
      bd.fieldCard(new CardData(1, 2))
      assert.equal(bd.FieldCard.Mark, 1)
      assert.equal(bd.FieldCard.Num, 2)
    })

    it ('フィールドカードがおかしい場合はエラーになる', () => {
      let bd = new BrainData
      assert.throws(() => {bd.fieldCard(null)})
    })
  })

  describe ('.selfHand()', () => {
    it ('自身の手札データを更新できる', () => {
      let bd = new BrainData
      bd.selfHand(new HandData([]))
      assert.equal(bd.SelfHand.cost(), 0)
    })

    it ('自身の手札データがおかしい場合はエラーになる', () => {
      let bd = new BrainData
      assert.throws(() => {bd.selfHand(null)})
    })
  })

  describe ('.putCards()', () => {
    it ('フィールドに置かれたカードを更新できる', () => {
      let bd = new BrainData
      bd.putCards([])
      assert.deepEqual(bd.PutCards, [])
    })

    it ('フィールドに置かれたカードがおかしい場合はエラーになる', () => {
      let bd = new BrainData
      assert.throws(() => {bd.putCards(null)})
    })
  })

  describe ('.pushPutCard()', () => {
    it ('フィールドに置かれたカードを追加できる', () => {
      let bd = new BrainData
      bd.pushPutCard(new CardData(2, 1))
      bd.pushPutCard(new CardData(0, 13))
      assert.equal(bd.PutCards[0].Mark, 2)
      assert.equal(bd.PutCards.length, 2)
    })

    it ('追加されるカードがおかしい場合はエラーになる', () => {
      let bd = new BrainData
      assert.throws(() => {bd.pushPutCard(null)})
    })
  })

  describe ('.puttableIdx()', () => {
    let hand = new HandData([
      new CardData(1, 3),
      new CardData(2, 3),
    ])
    it ('カードの優先順位を更新できる', () => {
      let bd = new BrainData
      bd.SelfHand = hand
      bd.puttableIdx({
        '-1': 10,
        1   : -5,
      })
      assert.deepEqual(bd.PuttableIdx, {'-1': 10, 1: -5,})
    })

    it ('手札の枚数+1以上の長さだとエラー (Drawを含むため)', () => {
      let bd = new BrainData
      bd.SelfHand = hand
      assert.throws(() => {bd.puttableIdx({'-1': 10, 1: -5, 2: 20})})
    })

    it ('存在しないHandIdxが含まれているとエラー', () => {
      let bd = new BrainData
      bd.SelfHand = hand
      assert.throws(() => {bd.puttableIdx({'-1': 10, 3: -5})})
    })

    it ('優先順位が範囲外だとエラー', () => {
      let bd = new BrainData
      bd.SelfHand = hand
      assert.throws(() => {bd.puttableIdx({'-1': 10, 1: 100})})
      assert.throws(() => {bd.puttableIdx({'-1': 10, 1: -100})})
    })
  })
})
