import assert from 'assert'
import CardData from '../../data/CardData'
import DeckData from '../../data/DeckData'

describe('DeckData', function () {
  describe('.constructure()', function () {
    it('正しく初期化できる', function () {
      let cards = [
          new CardData(0, 10),
          new CardData(1, 11),
      ]

      let dd = new DeckData(cards)
      assert.equal(dd.Cards[0].mark, 0);
      assert.equal(dd.Cards[0].num, 10);
      assert.equal(dd.Cards[1].mark, 1);
      assert.equal(dd.Cards[1].num, 11);
    })

    it('カードが空でも正しく初期化できる', function () {
      new DeckData([])
    })
  })

  describe('.cards()', function () {
    it('カードを更新できる', function () {
      let cards = [
          new CardData(2, 12),
      ]
      let dd = new DeckData(cards)

      assert.equal(dd.Cards[0].mark, 2);
      assert.equal(dd.Cards[0].num, 12);

      cards = [
        new CardData(3, 13),
      ]
      dd.cards(cards)

      assert.equal(dd.Cards[0].mark, 3);
      assert.equal(dd.Cards[0].num, 13);
    })
  })
})
