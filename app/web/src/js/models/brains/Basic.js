import Brain from '../Brain'
import Cell from '../BrainCell'

export default class Basic extends Brain {
  putOrDraw () {
    Cell.canDoneButDraw(this.data)
  }

  den () {
    return false
  }
}
