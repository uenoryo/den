import * as mocha from "mocha"
import * as assert from 'power-assert'
import { TestPlayer } from '../Helpers'
import { GameSetType } from '../../type/Type'
import CardData from '../../data/CardData'
import FieldData from '../../data/FieldData'
import HandData from '../../data/HandData'
import Referee from '../../model/Referee'

describe('Referee', () => {
  describe('.constructor()', () => {
    context('正しく初期化できる', () => {
      new Referee
    })
  })

  describe('.judgeDen()', () => {
    context('プレイヤーの手札で成立している GameSetType を返すことができる', () => {
      let tests = [
        {
          title: '手札が存在しない',
          hand: new HandData([
            new CardData(0, 12),
          ]),
          output: null,
        },
        {
          title: '役が成立していない',
          hand: new HandData([
            new CardData(0, 10),
            new CardData(0, 11),
          ]),
          output: null,
        },
        {
          title: 'Den',
          hand: new HandData([
            new CardData(0, 3),
            new CardData(0, 10),
          ]),
          output: GameSetType.Den,
        },
        {
          title: 'Anko',
          hand: new HandData([
            new CardData(0, 3),
            new CardData(1, 13),
            new CardData(2, 13),
            new CardData(3, 13),
          ]),
          output: GameSetType.Anko,
        },
        {
          title: 'Chitoi',
          hand: new HandData([
            new CardData(1, 13),
            new CardData(2, 13),
            new CardData(3, 13),
            new CardData(0, 11),
            new CardData(1, 11),
            new CardData(0, 10),
            new CardData(1, 10),
          ]),
          output: GameSetType.Chitoi,
        },
      ]
      let field = new FieldData([
        new CardData(0, 13),
      ])
      let referee = new Referee
      let player = TestPlayer()
      for (let test of tests) {
        it(test.title, () => {
          player.Hand = test.hand
          assert.equal(referee.judgeDen(player, field), test.output)
        })
      }
    })
  })
})
