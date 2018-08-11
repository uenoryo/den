import Brain from '../Brain'
import Cell from '../BrainCell'

export default class Basic extends Brain {
  putOrDraw () {
    Cell.canDoneButDraw(this.Data, 10)
    Cell.waitAnko(this.Data, 5)
  }

  den () {
    return true
  }
}
