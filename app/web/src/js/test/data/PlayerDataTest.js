import assert from 'assert'
import PlayerData from '../../data/PlayerData'

describe('PlayerData', function () {
  it('正しく初期化できる', function () {
    let pd = new PlayerData(1, 0)
    assert.equal(pd.id, 1);
    assert.equal(pd.type, 0);
  });

  it('IDがおかしい場合はエラーになる', function () {
    assert.throws(() => {new PlayerData('invalid ID', 0)});
  });

  it('タイプがおかしい場合はエラーになる', function () {
    assert.throws(() => {new PlayerData(1, 'Invalid Type')});
  });
});
