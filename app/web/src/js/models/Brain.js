import Constants from '../constants'
import BrainData from '../data/BrainData'

export default class Brain {
  constructor () {
    this.data = new BrainData
  }

  input (type, object) {
    switch (type) {
      case 'FieldCard':
        this.data.fieldCard(object)
        break
      case 'SelfHand':
        this.data.selfHand(object)
        break
      case 'PutCard':
        this.data.pushPutCard(object)
        break
    }

    this.interpret()

    this.setTarget()
  }

  interpret () {
    //
  }

  setTarget () {
    //
  }

  output (type) {
    if (this.data.FieldCard === null || this.data.SelfHand === null) {
      console.warn('Not enough input to output something, it need field card and self hand at least.')
      return null
    }

    switch (type) {
      case 'PutOrDraw':
        return this.putOrDraw()
      case 'ChangeMark':
        return this.changeMark()
      case 'Den':
        return this.den()
    }
  }

  putOrDraw () {
    //
  }

  changeMark () {
    //
  }

  den () {
    //
  }
}
