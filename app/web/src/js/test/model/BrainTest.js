import assert from 'assert'
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'
import BrainData from '../../data/BrainData'
import Brain from '../../models/Brain'

describe ('Brain', () => {
  describe ('.constructor()', () => {
    it ('正しく初期化できる', () => {
      new Brain
    })
  })

  describe('.input()', () => {
    describe ('情報を入力できる', () => {
      let b = new Brain
      it ('フィールドカードを記憶できる', () => {
        b.input('FieldCard', new CardData(0, 10))
        assert.equal(b.data.FieldCard.Mark, 0)
        assert.equal(b.data.FieldCard.Num, 10)
      })

      it ('自身の手札を記憶できる', () => {
        b.input('SelfHand', new HandData([new CardData(2, 4)]))
        assert.equal(b.data.SelfHand.Cards[0].Mark, 2)
        assert.equal(b.data.SelfHand.Cards[0].Num, 4)
      })

      it ('フィールドに置かれたカードを記憶できる', () => {
        b.input('PutCard', new CardData(3, 3))
        assert.equal(b.data.PutCards[0].Mark, 3)
        assert.equal(b.data.PutCards[0].Num, 3)
      })
    })
  })

  describe('.narrow()', () => {
    describe('通常モード', () => {
      let bd = new BrainData
      let hand = new HandData([
        new CardData(0, 5),
        new CardData(1, 5),
        new CardData(2, 5),
      ])
      bd.SelfHand = hand
      let b = new Brain
      bd.FieldCard = new CardData(2, 10)
      b.data = bd
      it ('手札から出せるカードを優先度を初期化しつつまとめられる', () => {
        b.narrow()
        assert.deepEqual(b.data.PuttableIdx, {'-1': 0, 2: 0})
      })
    })

    describe('ForceDrawモード', () => {
      it ('2がない場合はDrawしかない', () => {
        let bd = new BrainData
        let hand = new HandData([
          new CardData(0, 5),
          new CardData(1, 5),
          new CardData(2, 5),
        ])
        bd.SelfHand = hand
        let b = new Brain
        bd.FieldCard = new CardData(2, 2)
        b.data = bd
        b.narrow(true)
        assert.deepEqual(b.data.PuttableIdx, {'-1': 0})
      })
      it ('2がある場合', () => {
        let bd = new BrainData
        let hand = new HandData([
          new CardData(0, 5),
          new CardData(1, 2),
        ])
        bd.SelfHand = hand
        let b = new Brain
        bd.FieldCard = new CardData(2, 2)
        b.data = bd
        b.narrow(true)
        assert.deepEqual(b.data.PuttableIdx, {'-1': 0, 1: 0})
      })
    })
  })

  describe('.decide()', () => {
    let bd = new BrainData
    let hand = new HandData([
      new CardData(0, 5),
      new CardData(1, 5),
      new CardData(2, 5),
    ])
    bd.SelfHand = hand

    it ('優先度が1番高い手札のidxを返すことができる', () => {
      bd.puttableIdx({
        '-1': -4,
          1 : 5,
          2 : 6,
      })
      let b = new Brain
      b.data = bd
      assert.equal(b.decide(), 2)
    })

    it ('-1もキャストされて数値で返る', () => {
      bd.puttableIdx({
        '-1': 10,
          1 : 2,
          2 : 0,
      })
      let b = new Brain
      b.data = bd
      assert.equal(b.decide(), -1)
    })

    it ('優先度が設定されていなければ-1が返る', () => {
      bd.puttableIdx({})
      let b = new Brain
      b.data = bd
      assert.equal(b.decide(), -1)
    })
  })
})
