import assert from 'assert'
import CardData from '../../data/CardData'

describe('CardData', function () {
  it('正しく初期化できる', function () {
    let cd = new CardData(1, 13)
    assert.equal(cd.mark, 1);
    assert.equal(cd.num, 13);
  });

  it('マークがおかしい場合はエラーになる', function () {
    assert.throws(() => {new CardData('invalid Mark', 1)});
  });

  it('数字がおかしい場合はエラーになる', function () {
    assert.throws(() => {new CardData(1, 14)});
  });
});
