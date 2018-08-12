import * as mocha from "mocha";
import * as assert from 'power-assert';
import LocalStorage from '../../storage/LocalStorage'

describe('LocalStorage', () => {
  it('正しく初期化できる', () => {
    new LocalStorage
  })
})
