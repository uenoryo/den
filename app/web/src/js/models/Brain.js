import Constants from '../constants'
import BrainData from '../data/BrainData'
import DecidePlanBrainCell from './DecidePlanBrainCell'

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

    this.consider()
  }

  interpret () {
    //
  }

  consider () {
    DecidePlanBrainCell.wantPlainDone(this.data)
  }

  decide () {
    //
  }

  output (type) {
    if (this.data.FieldCard === null || this.data.SelfHand === null) {
      console.warn('Not enough input to output something, it need field card and self hand at least.')
      switch (type) {
        case 'PutOrDraw':
          return -1
        case 'ChangeMark':
          return Constants.CardMarkJokerA
        case 'Den':
          return false
      }
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
    return -1
  }

  changeMark () {
    //
  }

  den () {
    //
  }
}
