import assert from 'assert'
import Constants from '../../constants'
import Rule from '../../models/Rule'
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'

describe('Rule', () => {
  describe('.canPut()', () => {
    let tests = [
      {
        input: {
          field: new CardData(Constants.CardMarkClub, 1),
          target: new CardData(Constants.CardMarkClub, 12),
        },
        output: true,
      },
      {
        input: {
          field: new CardData(Constants.CardMarkClub, 10),
          target: new CardData(Constants.CardMarkDiamond, 10),
        },
        output: true,
      },
      {
        input: {
          field: new CardData(Constants.CardMarkClub, 1),
          target: new CardData(Constants.CardMarkSpade, 12),
        },
        output: false,
      },
      {
        input: {
          field: new CardData(Constants.CardMarkJoker, Constants.CardJokerNum),
          target: new CardData(Constants.CardMarkHeart, 5),
        },
        output: true,
      },
      {
        input: {
          field: new CardData(Constants.CardMarkClub, 13),
          target: new CardData(Constants.CardMarkJoker, Constants.CardJokerNum),
        },
        output: true,
      },
    ]

    for (let idx in tests) {
      it(`${tests[idx].input.field.toString()}が出ている時に${tests[idx].input.target.toString()}は${tests[idx].output ? '出せる' : '出せない'}`, () => {
        assert.equal(Rule.canPut(tests[idx].input.field, tests[idx].input.target), tests[idx].output)
      })
    }
  })

  describe('.isPank()', () => {
    it(`${Constants.PlayerHandMaxAmount}枚以下はパンクにならない`, () => {
      let cards = [
          new CardData(Constants.CardMarkClub, 10),
          new CardData(Constants.CardMarkClub, 11),
      ]
      assert.equal(Rule.isPank(new HandData(cards)), false)
    })

    it(`${Constants.PlayerHandMaxAmount+1}枚以上はパンクになる`, () => {
      let cards = [
          new CardData(Constants.CardMarkClub, 1),
          new CardData(Constants.CardMarkClub, 2),
          new CardData(Constants.CardMarkClub, 3),
          new CardData(Constants.CardMarkClub, 4),
          new CardData(Constants.CardMarkClub, 5),
          new CardData(Constants.CardMarkClub, 6),
          new CardData(Constants.CardMarkClub, 7),
          new CardData(Constants.CardMarkClub, 8),
          new CardData(Constants.CardMarkClub, 9),
          new CardData(Constants.CardMarkClub, 10),
          new CardData(Constants.CardMarkClub, 11),
          new CardData(Constants.CardMarkClub, 12),
          new CardData(Constants.CardMarkClub, 13),
          new CardData(Constants.CardMarkDiamond, 1),
      ]
      assert.equal(Rule.isPank(new HandData(cards)), true)
    })

    it(`HandDataを渡さないとエラーになる`, () => {
      assert.throws(() => {Rule.isPank('invalid hand')})
    })
  })
})
