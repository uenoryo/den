import * as mocha from "mocha";
import * as assert from 'power-assert';
import God from '../../model/God'

describe('God', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      new God
    })
  })
})
