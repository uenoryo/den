import * as mocha from "mocha";
import * as assert from 'power-assert';
import Brain from '../../model/Brain'
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'
import BrainData from '../../data/BrainData'

describe('Brain', () => {
  describe ('.constructor()', () => {
    it ('正しく初期化できる', () => {
      new Brain
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
        assert.deepEqual(b.Data.HandActionPriorities,  [ [ -1, 0 ], [ 2, 0 ] ])
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
        assert.deepEqual(b.Data.HandActionPriorities, [ [ -1, 0 ] ])
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
        assert.deepEqual(b.Data.HandActionPriorities,  [ [ -1, 0 ], [ 1, 0 ] ])
      })
    })
  })
})
