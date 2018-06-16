import assert from 'assert'
import PlayerData from '../../data/PlayerData'

describe('PlayerData', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', function () {
      let pd = new PlayerData(1, 0)
      assert.equal(pd.ID, 1)
      assert.equal(pd.Type, 0)
    })
  })

  describe('.id()', () => {
    it('IDを更新できる', () => {
      let pd = new PlayerData(2, 1)
      assert.equal(pd.ID, 2)

      pd = pd.id(3)
      assert.equal(pd.ID, 3)
      assert.equal(pd.constructor.name, 'PlayerData')
    })

    it('IDがおかしい場合はエラーになる', () => {
      assert.throws(() => {new PlayerData('invalid ID', 0)})
    })
  })

  describe('.type()', () => {
    it('タイプを更新できる', () => {
      let pd = new PlayerData(3, 0)
      assert.equal(pd.Type, 0)

      pd = pd.type(1)
      assert.equal(pd.Type, 1)
      assert.equal(pd.constructor.name, 'PlayerData')
    })

    it('タイプがおかしい場合はエラーになる', () => {
      assert.throws(() => {new PlayerData(1, 'Invalid Type')})
    })
  })
})
