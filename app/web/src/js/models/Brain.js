import Constants from '../constants'
import BrainData from '../data/BrainData'

export default class Brain {
  constructor () {
    this.data = new BrainData
  }

  input (type, object) {
    switch (type) {
      case 'FieldCard':
        return this.data.fieldCard(object)
      case 'SelfHand':
        return this.data.selfHand(object)
      case 'PutCard':
        return this.data.pushPutCard(object)
    }
  }
}
