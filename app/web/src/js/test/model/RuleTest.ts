import * as mocha from "mocha";
import * as assert from 'power-assert';
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'
import Rule from '../../model/Rule'
import { Constants } from '../../constant/Basic'


describe('Rule', () => {
  describe('.canPut()', () => {
    let tests = [
      {
        input: {
          field: new CardData(0, 1),
          target: new CardData(0, 12),
        },
        output: true,
      },
      {
        input: {
          field: new CardData(0, 10),
          target: new CardData(1, 10),
        },
        output: true,
      },
      {
        input: {
          field: new CardData(0, 1),
          target: new CardData(3, 12),
        },
        output: false,
      },
      {
        input: {
          field: new CardData(4, 0),
          target: new CardData(2, 5),
        },
        output: true,
      },
      {
        input: {
          field: new CardData(0, 13),
          target: new CardData(4, 0),
        },
        output: true,
      },
    ]

    for (let idx in tests) {
      it(`${tests[idx].input.field.toString()}が出ている時に${tests[idx].input.target.toString()}は${tests[idx].output ? '出せる' : '出せない'}`, () => {
        assert.equal(Rule.canPut(tests[idx].input.field, tests[idx].input.target, false), tests[idx].output)
      })
    }
  })

  describe('.isPank()', () => {
    it(`${Constants.PlayerHandMaxAmount}枚以下はパンクにならない`, () => {
      let cards = [
          new CardData(0, 10),
          new CardData(0, 11),
      ]
      assert.equal(Rule.isPank(new HandData(cards)), false)
    })

    it(`${Constants.PlayerHandMaxAmount+1}枚以上はパンクになる`, () => {
      let cards = [
          new CardData(0, 1),
          new CardData(0, 2),
          new CardData(0, 3),
          new CardData(0, 4),
          new CardData(0, 5),
          new CardData(0, 6),
          new CardData(0, 7),
          new CardData(0, 8),
          new CardData(0, 9),
          new CardData(0, 10),
          new CardData(0, 11),
          new CardData(0, 12),
          new CardData(0, 13),
          new CardData(1, 1),
      ]
      assert.equal(Rule.isPank(new HandData(cards)), true)
    })
  })
})
