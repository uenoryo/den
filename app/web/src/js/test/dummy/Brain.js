import BrainData from '../../data/BrainData'

export default class Deck {
  constructor() {
    this.data = new BrainData
    this.IsInput = false
    this.PutOrDrawOutput = null
    this.ChangeMarkOutput = null
    this.DenOutput = null
  }

  input (type, object) {
    this.IsInput = true
  }

  output (type) {
    switch (type) {
      case 'PutOrDraw':
        return this.PutOrDrawOutput
      case 'ChangeMark':
        return this.ChangeMarkOutput
      case 'Den':
        return this.DenOutput
    }
  }
}
