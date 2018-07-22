import Constants from '../constants'
import BrainData from '../data/BrainData'
import Rule from './Rule'
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
  }

  interpret () {
    //
  }

  narrow (isForceDraw) {
    let puttables = {
      '-1': 0
    }
    for (let idx in this.data.SelfHand.Cards) {
      if (Rule.canPut(this.data.FieldCard, this.data.SelfHand.Cards[idx], isForceDraw)) {
        puttables[idx] = 0
      }
    }
    this.data.puttableIdx(puttables)
  }

  decide () {
    let priorityIdx = -1
    if (Object.keys(this.data.PuttableIdx).length === 0) {
      return priorityIdx
    }

    // BrainData.PuttableIdx から値の一番大きい idx を取得する
    let maxPriority = null
    for (let idx in this.data.PuttableIdx) {
      if (maxPriority === null || maxPriority < this.data.PuttableIdx[idx]) {
        maxPriority = this.data.PuttableIdx[idx]
        priorityIdx = idx
      }
    }

    return parseInt(priorityIdx)
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
        this.narrow()
        this.putOrDraw()
        return this.decide()
      case 'PutOrForceDraw':
        this.narrow(true)
        this.putOrForceDraw()
        return this.decide()
      case 'ChangeMark':
        return this.changeMark()
      case 'Den':
        return this.den()
    }
  }

  putOrDraw () {
    //
  }

  putOrForceDraw () {
    this.putOrDraw()
  }

  changeMark () {
    //
  }

  den () {
    //
  }
}
