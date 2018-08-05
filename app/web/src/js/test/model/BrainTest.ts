import * as mocha from "mocha";
import * as assert from 'power-assert';
import Brain from '../../model/Brain'
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'
import BrainData from '../../data/BrainData'
import { CardMark } from '../../type/Type'

describe('Brain', () => {
  describe ('.constructor()', () => {
    it ('正しく初期化できる', () => {
      new Brain
    })
    it ('putOrDraw の初期値はdraw', () => {
      let brain = new Brain
      assert.equal(brain.putOrDraw(), -1)
    })
    it ('putOrForceDraw の初期値はdraw', () => {
      let brain = new Brain
      assert.equal(brain.putOrForceDraw(), -1)
    })
    it ('changeMark の初期値はJokerA', () => {
      let brain = new Brain
      assert.equal(brain.changeMark(), CardMark.JokerA)
    })
    it ('den の初期値はtrue', () => {
      let brain = new Brain
      assert.equal(brain.den(), true)
    })
  })

  describe ('.inputFieldCard()', () => {
    it ('フィールドカードを記憶できる', () => {
      let b = new Brain
      b.inputFieldCard(new CardData(1, 1))
      assert.deepEqual(b.Data.FieldCard, new CardData(1, 1))
    })
  })

  describe ('.inputSelfHand()', () => {
    it ('手札を記憶できる', () => {
      let b = new Brain
      let hand = new HandData([new CardData(0, 5)])
      b.inputSelfHand(hand)
      assert.deepEqual(b.Data.SelfHand, new HandData([new CardData(0, 5)]))
    })
  })

  describe ('.inputPutCard()', () => {
    it ('場に出されたカードを記憶できる', () => {
      let b = new Brain
      b.inputPutCard(new CardData(0, 1))
      b.inputPutCard(new CardData(0, 2))
      assert.deepEqual(b.Data.PutCards, [new CardData(0, 1), new CardData(0, 2)])
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
      b.Data = bd
      it ('手札から出せるカードを優先度を初期化しつつまとめられる', () => {
        b.narrow(false)
        assert.deepEqual(b.Data.HandPriorities,  [ [ -1, 0 ], [ 2, 0 ] ])
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
        b.Data = bd
        b.narrow(true)
        assert.deepEqual(b.Data.HandPriorities, [ [ -1, 0 ] ])
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
        b.Data = bd
        b.narrow(true)
        assert.deepEqual(b.Data.HandPriorities,  [ [ -1, 0 ], [ 1, 0 ] ])
      })
    })
  })

  describe('.confirm()', () => {
    it('FieldCardがなければエラーになる', () => {
      let bd = new BrainData
      bd.SelfHand = new HandData([])
      let b = new Brain
      b.Data = bd
      assert.throws(() => { b.confirm() })
    })

    it('SelfHandがなければエラーになる', () => {
      let bd = new BrainData
      bd.FieldCard = new CardData(2, 2)
      let b = new Brain
      b.Data = bd
      assert.throws(() => { b.confirm() })
    })

    it('FieldCardとSelfHandがなければエラーにならない', () => {
      let bd = new BrainData
      bd.SelfHand = new HandData([])
      bd.FieldCard = new CardData(2, 2)
      let b = new Brain
      b.Data = bd
      b.confirm()
    })
  })
})
