import * as mocha from "mocha"
import * as assert from 'power-assert'
import { DrawActionID } from '../../constant/Card'
import HandData from '../../data/HandData'
import CardData from '../../data/CardData'
import BrainData from '../../data/BrainData'
import BrainCell from '../../model/BrainCell'

describe('BrainCell', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      new BrainCell
    })
  })

  describe('.canDoneButDraw()', () => {
    context('素上がりできる場合におけるDrawの優先度を操作できる', () => {
      type test = {
        title: string,
        hand: CardData[]
        priorities: [number, number][],
        drawPriority: number,
      }

      let tests: test[] = [
        {
          title: '素上がりできるパターン',
          hand: [
            new CardData(1, 10),
          ],
          priorities: [
            [-1, 0],
            [0,  0],
          ],
          drawPriority: 10,
        },
        {
          title: '引くしかできないパターン',
          hand: [
            new CardData(3, 13),
          ],
          priorities: [
            [-1, 0],
          ],
          drawPriority: 0,
        },
        {
          title: '複数カードがあるパターン',
          hand: [
            new CardData(1, 10),
            new CardData(1, 11),
          ],
          priorities: [
            [-1, 0],
            [0,  0],
            [1,  0],
          ],
          drawPriority: 0,
        },
      ]
      for (let t of tests) {
        it(t.title, () => {
          let data = new BrainData
          data.SelfHand = new HandData(t.hand)
          data.HandPriorities = t.priorities
          let bc = new BrainCell
          bc.canDoneButDraw(data, 10, 100)
          assert.equal(data.getPriority(DrawActionID), t.drawPriority)
        })
      }
    })
  })

  describe('.waitAnko()', () => {
    context('Ankoができる場合に該当するカードの優先度を操作できる', () => {
      type test = {
        title: string,
        hand: CardData[]
        priorities: [number, number][],
        drawPriority: number,
      }

      let tests: test[] = [
        {
          title: 'Ankoできるパターン',
          hand: [
            new CardData(1, 10),
            new CardData(2, 10),
            new CardData(3, 10),
            new CardData(1, 13),
          ],
          priorities: [
            [-1, 0],
            [0,  0],
          ],
          drawPriority: 10,
        },
        {
          title: 'Ankoできないパターン',
          hand: [
            new CardData(1, 10),
            new CardData(2, 10),
            new CardData(1, 13),
          ],
          priorities: [
            [-1, 0],
            [0,  0],
          ],
          drawPriority: 0,
        },
      ]
      for (let t of tests) {
        it(t.title, () => {
          let data = new BrainData
          data.FieldCard = new CardData(0, 10)
          data.SelfHand = new HandData(t.hand)
          data.HandPriorities = t.priorities
          let bc = new BrainCell
          bc.waitAnko(data, 10, 100)
          assert.equal(data.getPriority(0), t.drawPriority)
        })
      }
    })
  })

  describe('.hit()', () => {
    context('確率で真偽を変えす', () => {
      let b = new BrainCell
      it('100では必ずtrue', () => {
        assert.equal(b.hit(100), true)
      })
      it('0では必ずfalse', () => {
        assert.equal(b.hit(0), false)
      })
    })
  })
})
