import * as mocha from "mocha"
import * as assert from 'power-assert'
import { Phase } from '../../type/Type'
import PhaseData from '../../data/PhaseData'

describe('PhaseData', () => {
  describe('.constructor()', () => {
    let phase = new PhaseData
    it('正しく phase が設定されている', () => {
      assert.equal(phase.Value, Phase.Normal)
    })

    it('正しく phase を判定できる 1', () => {
      assert.equal(phase.IsNormal, true)
    })

    it('正しく phase を判定できる 2', () => {
      assert.equal(phase.IsAttach, false)
    })
  })
})
