import * as mocha from "mocha";
import * as assert from 'power-assert';
import UserData from '../../data/UserData'

describe('UserData', () => {
  describe('.constructor()', () => {
    let user = new UserData
    it('所持金が正しく表示される(0)', () => {
      assert.equal(user.MoneyString, "0円")
    })
    it('所持金が正しく表示される(万)', () => {
      user.Money = 123
      assert.equal(user.MoneyString, "123万円")
    })
    it('所持金が正しく表示される(億)', () => {
      user.Money = 12345
      assert.equal(user.MoneyString, "1億2345万円")
    })
    it('所持金が正しく表示される(兆)', () => {
      user.Money = 123456789
      assert.equal(user.MoneyString, "1兆2345億6789万円")
    })
    it('所持金が正しく表示される(京)', () => {
      user.Money = 1234567890000
      assert.equal(user.MoneyString, "1京2345兆6789億円")
    })
    it('所持金が正しく表示される(0は削る)', () => {
      user.Money = 1000200003
      assert.equal(user.MoneyString, "10兆20億3万円")
    })
  })
})
