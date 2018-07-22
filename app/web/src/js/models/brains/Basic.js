import Brain from '../Brain'
import Cell from '../BrainCell'

export default class Basic extends Brain {
  putOrDraw () {
    Cell.canDoneButDraw(this.data, 10)
    Cell.waitAnko(this.data, 5)
  }

  den () {
    return true
  }
}
