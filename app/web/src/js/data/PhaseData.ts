import { Phase } from '../type/Type'

export default class PhaseData {
  public Value: Phase

  constructor() {
    this.Value = Phase.Normal
  }

  get IsNormal(): boolean {
    return this.Value === Phase.Normal
  }

  get IsForceDraw(): boolean {
    return this.Value === Phase.ForceDraw
  }

  get IsAttach(): boolean {
    return this.Value === Phase.Attach
  }

  get IsChangeMark(): boolean {
    return this.Value === Phase.ChangeMark
  }
}
