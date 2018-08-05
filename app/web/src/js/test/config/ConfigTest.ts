import * as mocha from "mocha";
import * as assert from 'power-assert';
import Config from '../../config/Config'

describe('Config', () => {
  it('正しく初期化できる', () => {
    new Config
  })
})
